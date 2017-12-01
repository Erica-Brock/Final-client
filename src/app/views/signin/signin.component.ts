import { Component, OnInit } from '@angular/core';
import { OktaService } from '../../services/okta.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user;
  oktaSignIn;

  constructor(private okta: OktaService) { 
    this.oktaSignIn = okta.getWidget();
  }

  showLogin(){
    this.oktaSignIn.renderEl({el: '#okta-login-container'}, (response) => {
      if (response.status === 'SUCCESS'){
        this.user = response.claims.email;
      }
    });
  }

  ngOnInit() {
    this.oktaSignIn.session.get((response) => {
      if (response.status !== 'INACTIVE'){
        this.user= response.login
      } else {
        this.showLogin();
      }
    })
  }

  logout() {
    this.oktaSignIn.signOut (() => {
      this.showLogin();
      this.user = undefined;
    });
  }
}
