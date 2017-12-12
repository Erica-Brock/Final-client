import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, OnDestroy } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { algoliaEnvironments } from "../../../enviroment";
import { Location } from '@angular/common';
import { MaterializeModule } from '../../../materialize/materialize.module';
import { connectHits } from 'instantsearch.js/es/connectors';
import { BaseSearch } from '../base';
import { MzModalService } from 'ng2-materialize';
import { JobModalComponent } from '../../../modals/job/job.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends BaseSearch implements OnInit {
  @ViewChild('button') btn: ElementRef;
  @ViewChild('button2') btn2: ElementRef;
  @ViewChild('jobModal') jobModal: IJob;
  job$: Promise<any>;
  jobSearch: any;
  type: string = null;
  results: any = null;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    // startingTop: '100%', // Starting top style attribute
    // endingTop: '10%', // Ending top style attribute
  };

  constructor(
    private renderer: Renderer,
    private location: Location,
    private modalSvc: MzModalService
  ) {
      super();
  }

  configureModal(job: any) {
    console.log(job);
    this.modalSvc.open(JobModalComponent, {
      job
    });
  }

  ngOnInit() {
    this.jobSearch = instantsearch(algoliaEnvironments.jobs.algolia);
    this.initializeWidgets();
  }

  ngAfterViewInit() {
    this.jobSearch.addWidget(this.widgets.search);
    this.jobSearch.addWidget(this.widgets.hits);
    this.jobSearch.addWidget(this.widgets.pagination);

    this.jobSearch.addWidget(this.info());

    this.jobSearch.start();
  }
}

interface IJob extends ElementRef {
  open?: Function; 
}