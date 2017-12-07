import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, OnDestroy } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { algoliaEnvironments } from "../../../enviroment";
import { Location } from '@angular/common';
import { MaterializeModule } from '../../../materialize/materialize.module';
import { connectHits } from 'instantsearch.js/es/connectors';
import { BaseSearch } from '../base';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent extends BaseSearch implements OnInit {
  @ViewChild('button') btn: ElementRef;
  @ViewChild('button2') btn2: ElementRef;
  jobSearch: any;
  type: string = null;
  results: any = null;

  constructor(
    private renderer: Renderer,
    private location: Location
  ) {
      super();
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
