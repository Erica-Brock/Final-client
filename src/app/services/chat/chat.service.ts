import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  static api = "api/chat/rooms"
  static api2 = "api/chat/messages"
  
  constructor(
    private socket: Socket,
    private http: HttpClient) { }

  sendMessage(msg: string){
    this.socket.emit("message", msg);
  }

  getMessage() {
    return this.socket
      .fromEvent("message")
      .map(( data: any) => data.msg );
  }

  getChatsByUser(id: number) {
    return this.http.get(`${ChatService.api}/${id}`)
  }

  getMessagesByChatroom(id: number) {
    return this.http.get(`${ChatService.api2}/${id}`)
  }
}
