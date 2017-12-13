import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobsService {

  static api = "/api/jobs"

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any> {
    return this.http.get(JobsService.api);
  }

  getJob(id: number): Observable<any> {
    return this.http.get(`${JobsService.api}/${id}`);
  }
  createJob(job):Observable<any>{
    return this.http.post(`${JobsService.api}`, job);
  }

  book(id: number, provider_id: number): Promise<any> {
    return this.http.put(`${JobsService.api}/book`, { id, provider_id })
      .toPromise();
  }
}
