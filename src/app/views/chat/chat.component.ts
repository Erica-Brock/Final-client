import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat/chat.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Socket } from 'ng-socket-io';
import { MaterializeModule } from "../../materialize/materialize.module"


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
  name: any;

  constructor(
    private svc: ChatService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sock: Socket) {
      this.form = this.fb.group({
        message: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      this.user_id = +params.get('id');
      return this.svc.getChatsByUser(this.user_id);
    })
    .subscribe((chats) => {
      this.chats = chats
      this.chat_id = chats[0].id

      this.svc.getMessagesByChatroom(this.chat_id)
      .subscribe((messages: Array<any>) => {
        console.log(messages)
        messages.forEach((m) => {
          if (m.user_id === 1) {
            m.user_type = 'self';
          } else {
            m.user_type = 'other';
          }
        });
        
        this.messages = messages;
      });
    })

    this.initializeSocketEvent();
  }

  private initializeSocketEvent() {
    this.sock.on('message',(message) => {
      this.messages.push(message);
    });
  }

  registerChatroom() {
    console.log('registering');
  }

  createMessage(){
    this.sock.emit("add-message", 
    { message: this.form.value.message,
      user_id: this.user_id,
      chat_id: this.chat_id,
      name: this.name
    });
  }
}

// this.route.paramMap
// .switchMap((params: ParamMap) => {
//   return this.jobSvc.getJob(+params.get('id'))
// })
// .subscribe(job => this.job = job);
// }