import { Component, OnInit } from '@angular/core';
import { JobsService } from "../../services/jobs.service";
import{ UsersService} from "../../services/users.service";
import {SigninService } from "../../services/signin/signin.service"
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import{ MzModalService } from 'ng2-materialize'
import{ReviewComponent } from "../../modals/review/review.component"

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  job: any;
  client;
  provider;
  user;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private jobSvc: JobsService,
    private userSvc: UsersService,
    private signinSvc: SigninService,
    private location: Location,
    private MzSvc:MzModalService
  ) { }

  ngOnInit() {
    this.signinSvc.me().then((user) => {
      this.user = user;
      this.getMe();
      })

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.jobSvc.getJob(+params.get('id'))
      })
      .subscribe((job) =>{ 
        this.job = job;
        console.log("this job", this.job);
        this.getClient();
        this.getProvider();
      });
     

  }
  getMe(){
    this.userSvc.getUser(this.user.id)
    .subscribe((user)=>{
      this.user=user;
    })
  }
  getClient(){
    this.userSvc.getUser(this.job.client_id)
    .subscribe((client)=>{
      this.client=client;
      console.log("the client is",this.client)
    })
  }
  getProvider(){
    if(this.job.provider_id){
      this.userSvc.getUser(this.job.provider_id)
      .subscribe((provider)=>{
        this.provider=provider;
        console.log("the provider is", this.provider)
      })
    }else{
      this.provider={
        name:"Job not booked",
        img:"https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png",
      }
    }
  }
  configureModal(){
    this.MzSvc.open(ReviewComponent,{
      provider: this.provider,
      client: this.client,
      user: this.user,
      job:this.job
    });
  }




}

// getMyUsers(client, provider, user){
//   this.userSvc.getUsers()
//   .subscribe((users)=>{
//     let myUsers=users;
//     myUsers.map((id, user)=>{
//       switch(id=user.id){
//         case client:
//           user=client;
//           id=myUsers.id
//       }
//     })
//     this.client=client;
//     this.user=user;
//     if(this.job.provider_id){
//       this.provider=provider;
//     }else{

//     }
//     console.log("the client is",this.client)
//   })
// }
