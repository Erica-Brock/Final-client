import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SigninService {
  static api: string= '/api/auth'
  constructor(private http: HttpClient) { }


  login(user: {email: string, password: string} ){
    return this.http
      .post(`${SigninService.api}/login`, user)
  }

  test() {
    return this.http.get(`${SigninService.api}/test`);
  }
}
