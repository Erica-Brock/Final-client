import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat/chat.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Socket } from 'ng-socket-io';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  form: FormGroup
  chats: any;
  messages: any;
  user_id: any;
  chat_id: any;

  constructor(
    private svc: ChatService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sock: Socket)
     {this.form = this.fb.group({
       message: ['', Validators.required]
     })
    }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.user_id = +params.get('id')
      return this.svc.getChatsByUser(this.user_id)
    })
    .subscribe((chats) => {
      this.chats = chats
      this.chat_id = chats[0].id

      this.svc.getMessagesByChatroom(this.chat_id)
      .subscribe((messages) => {
        console.log(messages)
        this.messages = messages;
      })
    })

    this.sock.on('message',(message) => {
      this.messages.push(message);
    })
  }

    createMessage(){
      this.sock.emit("add-message", 
      { message: this.form.value.message,
        user_id: this.user_id,
        chat_id: this.chat_id
      })
    }
}

// this.route.paramMap
// .switchMap((params: ParamMap) => {
//   return this.jobSvc.getJob(+params.get('id'))
// })
// .subscribe(job => this.job = job);
// }