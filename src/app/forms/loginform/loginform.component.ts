import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators } from '@angular/forms';
import { SigninService } from '../../services/signin/signin.service';
import {MaterializeModule} from '../../materialize/materialize.module'

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
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
        .then(() => {});
     }
   }

   public modalOptions: Materialize.ModalOptions = {
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .1, // Opacity of modal background
    inDuration: 800, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '55%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
   
  };


  ngOnInit() {
  }

}
