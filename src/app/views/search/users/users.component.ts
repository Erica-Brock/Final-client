import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, OnDestroy } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { algoliaEnvironments } from "../../../enviroment";
import { Location } from '@angular/common';
import { MaterializeModule } from '../../../materialize/materialize.module';
import { connectHits } from 'instantsearch.js/es/connectors';
import { BaseSearch } from '../base';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseSearch implements OnInit, AfterViewInit {
  @ViewChild('button') btn: ElementRef;
  @ViewChild('button2') btn2: ElementRef;
  userSearch: any;
  type: string = null;
  results: any = null;

  constructor(
    private renderer: Renderer,
    private location: Location
  ) {
      super();
  }

  ngOnInit() {
    this.userSearch = instantsearch(algoliaEnvironments.users.algolia);
    this.initializeWidgets();
    console.log(this.userSearch);
  }

  ngAfterViewInit() {
    this.userSearch.addWidget(this.widgets.search);
    this.userSearch.addWidget(this.widgets.hits);
    this.userSearch.addWidget(this.widgets.pagination);

    this.userSearch.addWidget(this.info());

    this.userSearch.start();
  }
}
