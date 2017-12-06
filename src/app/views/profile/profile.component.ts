import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: any;
  constructor(
    private http: HttpClient,
    private userSvc: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.userSvc.getUser(+params.get('id'))
      })
      .subscribe(user => this.user = user);
  }

}
