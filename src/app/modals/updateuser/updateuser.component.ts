import { Component, OnInit, Input, Inject,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {JobsService } from '../../services/jobs.service'
import {SigninService} from '../../services/signin/signin.service'
import { FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms'
import { MaterializeModule } from '../../materialize/materialize.module';
import { HttpClient } from '@angular/common/http';
import { MzBaseModal } from "ng2-materialize"
import{UsersService} from "../../services/users.service"

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateUserComponent extends MzBaseModal implements OnInit {
  @Input() user;
  form: FormGroup;
  info;
  @ViewChild("name")
  public nameElementRef: ElementRef;


  constructor(
    private router:Router,
    private jobsSvc: JobsService,
    private signinSvc: SigninService,
    private fb: FormBuilder,
    private UsersSvc:UsersService
  ) { 
    super()

  }

  ngOnInit() {
    this.form =this.fb.group({
      name:null,
      password:null,
      email:[null, Validators.compose([Validators.required, Validators.maxLength(300)])],
      city:[null, Validators.compose([Validators.required, Validators.maxLength(300)])],
      state:null,
      phone:null,
      bio:null
    });
  }

  configureForm(){
    if(this.nameElementRef.nativeElement.value==""){
      this.nameElementRef.nativeElement.value= this.user.name
    }

  }

  UpdateUser(){
    // this.configureForm();
    this.info=(this.form.value);
    
console.log(this.info)
    this.UsersSvc.UpdateUser(this.user.id, this.info)
    .subscribe((update)=>{
      console.log(update,"update")
    });
  }
}

// createReview():void{
//   this.review=(this.form.value);
//   console.log( "working", this.review)
//   this.reviewsSvc.createReview(this.review)
//   .subscribe((review)=>{
//     console.log("review",review)
//   })
// }