import{MaterializeModule} from "../../materialize/materialize.module";
import { Component, OnInit } from '@angular/core';
import{SigninService}from "../../services/signin/signin.service";
import{ Router } from "@angular/router";
import { UsersService } from "../../services/users.service";
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
user;
skills: Array<any>;
  constructor(
    private signinSvc: SigninService,
    private router: Router,
    private userSvc: UsersService
  ) { }

  ngOnInit() {
    this.signinSvc.me().then((user)=>{
      this.user=user
      console.log("me")
      console.log (user)
      this.userSvc.getUser(this.user.id)
      .subscribe((user)=>{
        this.user=user;
      })
      this.userSvc.getSkillsByUser(this.user.id)
      .subscribe((skills) => {
        this.skills = skills;
      })
    
    })
  }
  goToUser() {
    this.router.navigateByUrl("/profile/:id")
  }
}
