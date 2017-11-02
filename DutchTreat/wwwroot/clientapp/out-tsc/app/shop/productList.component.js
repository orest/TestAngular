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
var dataService_1 = require("../shared/dataService");
var ProductList = (function () {
    function ProductList(dataService) {
        this.dataService = dataService;
    }
    ProductList.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.loadProducts()
            .subscribe(function (data) { return _this.products = _this.dataService.products; });
    };
    ProductList.prototype.addProduct = function (product) {
        this.dataService.AddToOrder(product);
    };
    return ProductList;
}());
ProductList = __decorate([
    core_1.Component({
        selector: "product-list",
        templateUrl: "productList.component.html",
        styleUrls: ["productList.component.css"]
    }),
    __metadata("design:paramtypes", [dataService_1.DataService])
], ProductList);
exports.ProductList = ProductList;
//# sourceMappingURL=productList.component.js.map