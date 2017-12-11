import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SigninService {
  static api: string= '/api/auth'
  user: any;
  constructor(private http: HttpClient) { }


  login(user: {email: string, password: string} ){
    return this.http
      .post(`${SigninService.api}/login`, user)
      .toPromise()
      .then((user) => {
        this.user = user;
        return this.user;
      }); 
  }

  me() {
    return Promise.resolve(this.user);
  }

  setMe(me) {
    console.log(me);
    this.user = me;
  }

  refreshUser() {
    return this.http.get(`${SigninService.api}/refresh`)
      .toPromise();
  }

  test() {
    return this.http.get(`${SigninService.api}/test`);
  }
}
