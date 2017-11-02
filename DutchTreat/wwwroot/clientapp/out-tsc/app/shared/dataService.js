"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
// import * as orders from "./order";
var order_1 = require("./order");
require("rxjs/add/operator/map");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.products = [];
        this.order = new order_1.Order();
        this.token = "";
    }
    Object.defineProperty(DataService.prototype, "isLoginRequired", {
        get: function () {
            return this.token.length == 0 || this.tokenExpitration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    DataService.prototype.login = function (creds) {
        var _this = this;
        return this.http.post("/account/CreateToken", creds).map(function (response) {
            console.log(response);
            _this.token = response.token;
            _this.tokenExpitration = response.expiration;
            return true;
        });
    };
    DataService.prototype.loadProducts = function () {
        var _this = this;
        return this.http.get("/api/products")
            .map(function (data) {
            _this.products = data;
            return true;
        });
    };
    DataService.prototype.checkout = function () {
        var _this = this;
        if (!this.order.orderNumber) {
            this.order.orderNumber = this.order.orderDate.getFullYear().toString()
                + this.order.orderDate.getTime().toString();
        }
        return this.http.post("/api/orders", this.order, {
            headers: new http_1.HttpHeaders().set('Authorization', 'Bearer ' + this.token),
        }).map(function (p) {
            _this.order = new order_1.Order();
            return true;
        });
    };
    DataService.prototype.AddToOrder = function (product) {
        var item = this.order.items.find(function (p) { return p.productId == product.id; });
        if (item) {
            item.quantity++;
        }
        else {
            item = new order_1.OrderItem();
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
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=dataService.js.map