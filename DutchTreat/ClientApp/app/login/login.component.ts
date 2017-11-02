import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/dataService';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: []
})
export class Login implements OnInit {
  public errorMessage: string = "";
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  public creds = {
    username: "",
    password: ""
  }

  onLogin() {
    this.dataService.login(this.creds).subscribe(sucess => {
      if (sucess) {
        if (this.dataService.order.items.length) {
          this.router.navigate(["./checkout"]);
          return;
        }
        this.router.navigate(["/"]);
      }
    }, error => {
      this.errorMessage = "Faild to login";
    })
  }
}
