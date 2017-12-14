import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal } from "ng2-materialize"
import { Router } from '@angular/router';
import {JobsService } from '../../services/jobs.service'
import{ ReviewsService }from '../../services/reviews.service'
import {SigninService} from '../../services/signin/signin.service'
import { FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms'
import { MaterializeModule } from '../../materialize/materialize.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends MzBaseModal implements OnInit{
  @Input() client;
  @Input() user;
  @Input() provider;
  @Input() job;
  review;
  form;

  constructor(
    private router:Router,
    private jobsSvc: JobsService,
    private signinSvc: SigninService,
    private fb: FormBuilder,
    private reviewsSvc: ReviewsService
  ) {
    super();
    }

  ngOnInit() {
    this.form =this.fb.group({
      client_id:this.client.id,
      job_id: this.job.id,
      provider_id: this.provider.id,
      rating:"",
      review:["", Validators.compose([Validators.required, Validators.maxLength(500)])]
    });
  }
  createReview():void{
    this.review = this.form.value;


    this.reviewsSvc.createReview(this.review)
      .subscribe((review)=>{
        console.log("review",review)
      });
  }

}
