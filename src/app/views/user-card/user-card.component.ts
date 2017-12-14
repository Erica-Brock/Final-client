import{MaterializeModule} from "../../materialize/materialize.module";
import { Component, OnInit } from '@angular/core';
import{SigninService}from "../../services/signin/signin.service";
import{ Router } from "@angular/router";
import { UsersService } from "../../services/users.service";
import{} from"../../../assets/images/skillbox-background.png"
import { JobsService } from "../../services/jobs.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
user;
jobs;
skills: Array<any>;
  constructor(
    private signinSvc: SigninService,
    private router: Router,
    private userSvc: UsersService,
    private jobsvc:JobsService,
    private santizer: DomSanitizer
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
        skills.forEach((s) => {
          s.skillBackground = this.santizer.bypassSecurityTrustUrl(s.skillBackground);
        });

        this.skills = skills;
      })
      this.userSvc.getJobsByProvider(this.user.id)
      .subscribe((jobs) => {
        this.jobs = jobs;
      });
      
    
    })
  }
  goToUser() {
    this.router.navigateByUrl("/profile/:id")
  }
}
