import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { algoliaEnvironments } from "../../enviroment";
import { Location } from '@angular/common';
import { MaterializeModule } from '../../materialize/materialize.module';
import { connectHits } from 'instantsearch.js/es/connectors';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('button') btn: ElementRef;
  @ViewChild('button2') btn2: ElementRef;
  userSearch: any;
  jobSearch: any;
  searchTypes: { USERS: string; JOBS: string; } = {
    USERS: 'USERS',
    JOBS: 'JOBS'
  };
  type: string = null;
  results: any = null;

  private widgets = {
    search: null,
    hits: null,
    pagination: null
  };

  constructor(
    private renderer: Renderer,
    private location: Location) { }

  ngOnInit() {
    if (!!instantsearch) {
      this.userSearch = instantsearch(algoliaEnvironments.users.algolia);
      this.jobSearch = instantsearch(algoliaEnvironments.jobs.algolia);

      this.widgets.search = searchBox({
        container: '#search-box',
        cssClasses: {
          root: 'app-search-box',
          input: 'app-search-box-input'
        }
      });

      this.widgets.hits = hitsPerPageSelector({
        container: '#hitsPer',
        items : [
          {value: 5, label: 'Show me 5 results', default: true},
          {value: 10, label: 'Show me 10 results'},
          {value: 15, label: 'Show me 15 results'},
        ],
        cssClasses: {
          root: 'app-hits-per-page',
          select: 'app-hits-per-page-select',
          item: 'app-hits-per-page-item'
        }
      });

      this.widgets.pagination = pagination({
        container: '#pagination',
        cssClasses: {
          root: 'app-pagination',
          item: 'app-pagination-item',
          link: 'app-pagination-link',
          page: 'app-pagination-page',
          previous: 'app-pagination-previous',
          next: 'app-pagination-next',
          first: 'app-pagination-first',
          last: 'app-pagination-last',
          active: 'app-pagination-active',
          disabled: 'app-pagination-disabled'
        }
      });
    } else {
      alert('algolia is not loaded');
    }
  }

  ngAfterViewInit() {
    this.type = 'USERS';
    this.addWidgets(this.searchTypes.USERS);
  }

  destroyWidgets(type: string) {
    if (type === this.searchTypes.USERS) {
      this.userSearch.dispose();
    } else if (type === this.searchTypes.JOBS) {
      this.jobSearch.dispose();
    }
  }

  toggleButtons(type: string) {
    if (type === this.searchTypes.USERS) {
      this.renderer.setElementStyle(this.btn.nativeElement, "display", "inline");
      this.renderer.setElementStyle(this.btn2.nativeElement, "display", "none");
    } else if (type === this.searchTypes.JOBS) {
      this.renderer.setElementStyle(this.btn.nativeElement, "display", "inline");
      this.renderer.setElementStyle(this.btn2.nativeElement, "display", "none");
    }
  }

  switchSearch(type: string) {
    if (type === this.searchTypes.JOBS) {
      this.destroyWidgets(this.searchTypes.USERS);
      this.addWidgets(this.searchTypes.JOBS);

      this.jobSearch.start();
    } else if (type === this.searchTypes.USERS) {
      this.destroyWidgets(this.searchTypes.JOBS);
      this.addWidgets(this.searchTypes.USERS);

      this.userSearch.start();
    }
  }

  addWidgets(type: string) {
    if (type === this.searchTypes.USERS) {
      this.userSearch.addWidget(this.widgets.search);
      this.userSearch.addWidget(this.widgets.hits);
      this.userSearch.addWidget(this.widgets.pagination);

      this.toggleButtons(this.searchTypes.USERS);

      const info = connectHits(this.hitStream);
      this.userSearch.addWidget(info());

      this.userSearch.start();
    } else if (type === this.searchTypes.JOBS) {
      this.jobSearch.addWidget(this.widgets.search);
      this.jobSearch.addWidget(this.widgets.hits);
      this.jobSearch.addWidget(this.widgets.pagination);

      this.toggleButtons(this.searchTypes.JOBS);

      const info = connectHits(this.hitStream);
      this.jobSearch.addWidget(info());

      this.jobSearch.start();
    }
  }

  hitStream = (results, isFirstRendering) => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        console.log(this);
        this.results = results;
      });
    }

    this.results = results;
  }
}
