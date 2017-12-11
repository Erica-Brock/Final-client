import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from "../../services/chat/chat.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Socket } from 'ng-socket-io';
import { MaterializeModule } from "../../materialize/materialize.module"
import { SigninService } from '../../services/signin/signin.service';


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
  me: any;
  @ViewChild('module') chatbox: ElementRef;

  constructor(
    private svc: ChatService,
    private signinSvc: SigninService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sock: Socket) {
      this.form = this.fb.group({
        message: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.signinSvc.me()
      .then((me) => {
        this.me = me;
        this.svc.getChatsByUser(me.id)
          .subscribe((chats) => {
            this.chats = chats
            this.chat_id = chats[0].id

            this.svc.getMessagesByChatroom(this.chat_id)
            .subscribe((messages: Array<any>) => {
              console.log(messages)
              messages.forEach((m) => {
                if (m.user_id === me.id) {
                  m.user_type = 'self';
                } else {
                  m.user_type = 'other';
                }

                const timestamp = new Date(m.time_stamp);
                const now = new Date();
                const diffMs = now.getTime() - timestamp.getTime();
                const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 
                m.since = diffMins;
              });

              this.messages = messages;
            });
          });
      });

    this.initializeSocketEvent();
  }

  toggleChat() {
    if (this.chatbox.nativeElement.className.indexOf('open') != -1) {
      this.chatbox.nativeElement.className = 'module close';
    } else {
      this.chatbox.nativeElement.className = 'module open';
    }
  }

  private initializeSocketEvent() {
    this.sock.on('message',(message) => {
      message.user_type = 'self';
      this.messages.push(message);
    });
  }

  registerChatroom() {
    console.log('registering');
  }

  createMessage(){
    this.sock.emit("add-message", { 
      message: this.form.value.message,
      user_id: this.me.id,
      chat_id: this.chat_id,
      name: this.me.name
    });
  }
}