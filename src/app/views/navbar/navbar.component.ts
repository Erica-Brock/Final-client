import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeModule } from '../../materialize/materialize.module';
import { HttpClient } from '@angular/common/http';
import {SigninService} from '../../services/signin/signin.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
user;

  constructor(
    private signinSvc: SigninService
  ) {

  }

  ngOnInit() {
    this.signinSvc.me().then((user)=>{
      this.user=user
      console.log("me")
      console.log (user)
    })
    
  }

}
