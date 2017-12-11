import { Component, OnInit } from '@angular/core';
import { SigninService } from './services/signin/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private svc: SigninService) {

  }

  ngOnInit() {
    this.svc.refreshUser()
      .then((user) => {
        this.svc.setMe(user);
      }, (err) => {
        console.log('refresh error ', err);
      });
  }
}