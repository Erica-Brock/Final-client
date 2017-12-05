import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobsService {

  static api = "/api/jobs"

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any> {
    return this.http.get(JobsService.api)
  }

  getJob(id: number): Observable<any> {
    return this.http.get(`${JobsService.api}/${id}`)
  }
}
