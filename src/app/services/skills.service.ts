import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SkillsService {
  static api ='/api/skills'

  constructor(private http:HttpClient) { }

  getSkills():Observable<any>{
    return this.http.get(SkillsService.api)
  }
insertUserSkill(skill):Promise<any>{
  return this.http.post(SkillsService.api, skill)
  .toPromise()
}
}
