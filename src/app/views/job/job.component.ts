import { Component, OnInit } from '@angular/core';
import { JobsService } from "../../services/jobs.service";
import { HttpClient } from '@angular/common/http';
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  job: any;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private jobSvc: JobsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.jobSvc.getJob(+params.get('id'))
      })
      .subscribe(job => this.job = job);
  }

}
