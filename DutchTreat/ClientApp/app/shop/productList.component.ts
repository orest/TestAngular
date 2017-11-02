import { Component, OnInit } from "@angular/core"
import { DataService } from "../shared/dataService";
import { IProduct} from "../shared/product"
@Component({
    selector: "product-list",
    templateUrl: "productList.component.html",
    styleUrls: ["productList.component.css"]
})
export class ProductList implements OnInit {
    public products: IProduct[];
    constructor(private dataService: DataService) {

    }
    ngOnInit() {
        this.dataService.loadProducts()
            .subscribe(data => this.products = this.dataService.products);
    }
    addProduct(product:IProduct){
        this.dataService.AddToOrder(product);
    }
}