import { Component, OnInit } from "@angular/core"

import { DataService } from "../shared/dataService";
import { IProduct } from "../shared/product"
import { Router } from "@angular/router";

@Component({
    selector: "the-cart",
    templateUrl: "cart.component.html",
    styleUrls: []
})
export class Cart implements OnInit {
    constructor(private data: DataService, private router: Router) {

    }

    ngOnInit() {

    }
    onCheckout() {
        if (this.data.isLoginRequired) {
            this.router.navigate(["login"])
        } else {
            this.router.navigate(["checkout"])
        }
    }
}