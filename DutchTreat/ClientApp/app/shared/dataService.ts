import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProduct } from "./product";
// import * as orders from "./order";
import { Order, OrderItem } from "./order";
import "rxjs/add/operator/map";
import { IUserToken } from "./tokeInfo";


@Injectable()
export class DataService {

    public products: IProduct[] = [];
    public order: Order = new Order();
    private token: string = "";
    private tokenExpitration: Date;

    constructor(private http: HttpClient) {

    }
    public get isLoginRequired(): boolean {
        return this.token.length == 0 || this.tokenExpitration > new Date();
    }

    public login(creds): Observable<boolean> {
        return this.http.post<IUserToken>("/account/CreateToken", creds).map(response => {
            console.log(response)
            this.token = response.token;
            this.tokenExpitration = response.expiration;
            return true;
        });
    }

    loadProducts(): Observable<boolean> {
        return this.http.get("/api/products")
            .map((data: any[]) => {
                this.products = data;
                return true;
            });
    }

    public checkout() {
        if(!this.order.orderNumber){
            this.order.orderNumber=this.order.orderDate.getFullYear().toString()
            +this.order.orderDate.getTime().toString();
        }
        return this.http.post("/api/orders", this.order,{
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
        }).map(p => {
            this.order = new Order();
            return true;
        });
    }


    public AddToOrder(product: IProduct) {
        let item: OrderItem = this.order.items.find(p => p.productId == product.id)

        if (item) {
            item.quantity++;
        } else {
            item = new OrderItem();
            item.productId = product.id;
            item.productArtist = product.artist;
            item.productCategory = product.category;
            item.productArtId = product.artId;
            item.productTitle = product.title;
            item.productSize = product.size;
            item.unitPrice = product.price;
            item.quantity = 1;
            this.order.items.push(item);
        }
    }


}