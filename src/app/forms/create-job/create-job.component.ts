import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JobsService } from '../../services/jobs.service'
import {SigninService} from '../../services/signin/signin.service'
import { FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms'
import { MaterializeModule } from '../../materialize/materialize.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
user;
job;
form: FormGroup;
  constructor(
    private router:Router,
    private jobsSvc: JobsService,
    private signinSvc: SigninService,
    private fb: FormBuilder,
  ) {     
    this.form =this.fb.group({
    // client_id: this.user.id,
    provider_id:"",
    title:"",
    description:["", Validators.compose([Validators.required, Validators.maxLength(300)])],
    location:["", Validators.compose([Validators.required, Validators.maxLength(300)])],
    status:""
  })
  }
  ngOnInit() {
    this.signinSvc.me().then((user)=>{
      this.user=user
      console.log("me")
      console.log (user)
    })
  }
  createJob():void{
    this.job=(this.form.value)
    this.jobsSvc.createJob(this.job)
    .subscribe((job)=>{
      console.log(job)
      this.router.navigateByUrl(`/job:${job}`)
    })
  }
}
