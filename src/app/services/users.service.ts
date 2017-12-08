import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  static api ='/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(UsersService.api)
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${UsersService.api}/${id}`)
  }
  getJobsByProvider(id:number): Observable<any> {
    return this.http.get(`${UsersService.api}/jobs/accepted/${id}`)
  }
  getSkillsByUser(id:number): Observable<any>{
    return this.http.get(`${UsersService.api}/skills/${id}`)
  }
}
