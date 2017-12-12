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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.userSvc.getUser(this.id)
        .subscribe(user => this.user = user);

      this.userSvc.getJobsByProvider(this.id)
        .subscribe((jobs) => {
          this.jobs = jobs;
          this.checkStatus();
        });
      this.userSvc.getSkillsByUser(this.id)
        .subscribe((skills) => {
          this.skills = skills;
        })

      this.reviewSvc.getReviewByReciever(this.id)
        .subscribe((reviews) => {
          this.reviews = reviews;
        })
      this.skillsSvc.getSkills()
        .subscribe((allSkills) => {
          this.skillOptions = allSkills;
        })
    });
  }
  checkStatus(): void {
    for (var i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].status === "accepted") {
        this.bookedJobs.push(this.jobs[i]);
      } else if (this.jobs[i].status === "complete") {
        this.completedJobs.push(this.jobs[i]);
      }
    }
  }
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
  goToJob(job): void {
    console.log(this.user)
    this.router.navigateByUrl(`/job/${job.job_id}`)
  }
}
