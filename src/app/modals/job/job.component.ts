import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobModalComponent extends MzBaseModal implements OnInit {
  @Input() job: any;
  
  constructor() {
    super();
   }

  ngOnInit() {
  }

}
