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
form;
  constructor(
    private router:Router,
    private jobsSvc: JobsService,
    private signinSvc: SigninService,
    private fb: FormBuilder,
  ) { }
  ngOnInit() {
    this.signinSvc.me().then((user)=>{
      this.user=user
      this.form =this.fb.group({
        client_id:this.user.id,
        provider_id: null,
        title:"",
        description:["", Validators.compose([Validators.required, Validators.maxLength(300)])],
        location:["", Validators.compose([Validators.required, Validators.maxLength(300)])],
      })  
    })
  }
  createJob():void{
    this.job=(this.form.value)
    this.jobsSvc.createJob(this.job)
    .subscribe((newJob)=>{
     console.log(newJob)
      this.router.navigateByUrl(`/job/${newJob.id}`)
    })
  }
}
