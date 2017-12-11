import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  static api ='/api/users';
  user={
    id:41,
  };

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
  UpdateUser(id:number, user): Observable<any>{
    return this.http.put(`${UsersService.api}/${id}`, user)
  }
  me(login?: boolean) {
    return new Promise((resolve, reject) => {
        // if (isNil(this.user)) {
        //     if (login) {
        //         this.router.navigate(['/login']);
        //         return;
        //     }
            
        //     reject();
        //     return;
        // } 
 
        resolve(this.user);
    });
}
}
