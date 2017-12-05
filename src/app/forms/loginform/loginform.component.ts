import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators } from '@angular/forms'
import { SigninService } from '../../services/signin/signin.service';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  loginForm: FormGroup
  user: any;
  constructor(
    private fb: FormBuilder,
    private svc: SigninService
  ) {
    this.createForm();
   }


   createForm(){
     this.loginForm = this.fb.group ({
       email:['',Validators.required],
       password:['', Validators.required]
     })
   }


   login(){
     if(this.loginForm.status === 'VALID'){
       console.log('sending');
      this.svc.login(this.loginForm.value)
      .subscribe((res) => {
        console.log('res', res);
      }, (err) => {
        console.log('err', err);
      })
     }
   }


  ngOnInit() {
  }

}
