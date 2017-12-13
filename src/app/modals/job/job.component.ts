import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';
import { JobsService } from '../../services/jobs.service';
import { SigninService } from '../../services/signin/signin.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobModalComponent extends MzBaseModal implements OnInit {
  @Input() job: any;

  constructor(
    private svc: JobsService,
    private signinSvc: SigninService
  ) {
    super();
   }

  ngOnInit() {
  }

  book() {
    this.signinSvc.me()
      .then((me) => {
        this.svc.book(this.job.id, me.id)
          .then(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            });
      }, 
      (err) => {
        console.log('me err', err);
      });
  }
}
