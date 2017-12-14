import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { MaterializeModule } from '../../materialize/materialize.module';
import { ReviewsService } from '..//../services/reviews.service';
import { Router } from '@angular/router';
import { SkillsService } from "../../services/skills.service";
import { SigninService } from "../../services/signin/signin.service"
import{ MzModalService } from 'ng2-materialize'
import {UpdateUserComponent} from "../../modals/updateuser/updateuser.component"
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  jobs: Array<any>;
  completedJobs: Array<any> = [];
  bookedJobs: Array<any> = [];
  reviews: Array<any> = [];
  skills: Array<any> = [];
  addingSkills: Array<number> = [];
  deletingSkills: Array<number> = [];
  skillOptions: Array<any> = [];
  id: number;
  constructor(
    private http: HttpClient,
    private skillsSvc: SkillsService,
    private userSvc: UsersService,
    private reviewSvc: ReviewsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private signinSvc: SigninService,
    private MzSvc:MzModalService
  ) { }

  ngOnInit(): void {
    this.signinSvc.me().then((user) => {
      this.user = user;
      console.log("me")
      console.log(user)
      this.userSvc.getUser(this.user.id)
        .subscribe((user)=>{
          this.user=user
        })
      this.userSvc.getJobsByProvider(this.user.id)
        .subscribe((jobs) => {
          this.jobs = jobs;
          this.checkStatus();
        });
      this.userSvc.getSkillsByUser(this.user.id)
        .subscribe((skills) => {
          this.skills = skills;
        })

      this.reviewSvc.getReviewByReciever(this.user.id)
        .subscribe((reviews) => {
          this.reviews = reviews;
        })
      this.skillsSvc.getSkills()
        .subscribe((allSkills) => {
          this.skillOptions = allSkills;
        })
    })
  }
  // ckeck the status of jobs
  checkStatus(): void {
    console.log(this.jobs)
    for (var i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].isAccepted) {
        this.bookedJobs.push(this.jobs[i]);
      } else if (this.jobs[i].isCompleted) {
        this.completedJobs.push(this.jobs[i]);
      }
    }
  }
  // select and deselect skills and push into respective arrays 
  select(skill) {
    var isSkill = this.skills.some(function (check) {
      return check.skill === skill.skill;
    })
    var isDeleting = this.deletingSkills.includes(skill.id)
    var isSelected = this.addingSkills.includes(skill.id)
    if (isSelected) {
      var index = this.addingSkills.indexOf(skill.id)
      this.addingSkills.splice(index, 1)
    } else if (isDeleting) {
      var index2 = this.deletingSkills.indexOf(skill.id)
      this.deletingSkills.splice(index2, 1)
    } else if (isSkill) {
      this.deletingSkills.push(skill.id);
    }
    else {
      this.addingSkills.push(skill.id);
    }
  }
  submitSkills() {
    console.log(this.addingSkills)
    let submit = this.addingSkills.map((id) => {
      return this.skillsSvc.insertUserSkill(+this.user.id, +id)  
    })
    let destroy = this.deletingSkills.map((id)=>{
      return this.skillsSvc.deleteUserSkill(+this.user.id, +id)
    })
    let changes= submit.concat(destroy)
    console.log( changes );
    Promise.all(changes)
      .then((res) => {
        console.log('promise done');
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }
  goToJob(job): void {
    console.log(this.user)
    this.router.navigateByUrl(`/job/${job.job_id}`)
  }
  configureModal(user){
    this.MzSvc.open(UpdateUserComponent,{
      user: this.user,
    });
  }
}
