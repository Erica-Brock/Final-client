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
   me$;

  constructor(
    private signinSvc: SigninService
  ) {

  }

  ngOnInit() {
    this.me$ = this.signinSvc.me()
      .then((me) =>{
        return me;
      });
  }
}
