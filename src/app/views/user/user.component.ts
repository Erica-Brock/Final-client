import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { environment, environment2 } from "../../enviroment";
import { Location } from '@angular/common';
import { MaterializeModule } from '../../materialize/materialize.module';
import { connectHits } from 'instantsearch.js/es/connectors';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('button') btn: ElementRef;
  @ViewChild('button2') btn2: ElementRef;
  search: any;
  search2 = instantsearch(environment2.algolia);
  state: { hits: {}[] } = { hits: []}
  isJobs = false;

  constructor(
    private renderer: Renderer,
    private location: Location) { }

  ngOnInit() {
    const options = environment.algolia;
    const options2 = environment2.algolia;
    this.search = instantsearch(options);
    const info = connectHits(this.updateState);
    this.search.addWidget(info());
    // console.log(this.state)
    // this.search2 = instantsearch(options2);
    this.renderer.setElementStyle(this.btn2.nativeElement, "display", "none");

    this.search.addWidget(
      searchBox({
        container: '#search-box',
        cssClasses: {
          root: 'app-search-box',
          input: 'app-search-box-input'
      }
      })
    );

    this.search.addWidget(
      hitsPerPageSelector({
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
      })
    );
    
    // this.search.addWidget( 
    //   hits({
    //     container: '#hits',
    //     hitsPerPage: 10,
    //     templates: {
    //       empty: 'No results',
    //       item: 
    //             `<ng-template>
    //               <div class="is-hits-root">
    //                 <ul>
    //                   <img src={{img}}>
    //                   <span>
    //                     <a href='/profile/{{id}}'>User: {{{_highlightResult.name.value}}}</a></br>
    //                     Email: {{{_highlightResult.email.value }}}</br>
    //                     {{city}}, {{state}}
    //                   </span>
    //                   <span id="skills">
    //                         <li> {{ skills }}</li>
    //                   </span>
    //                 </ul>
    //               </div>
    //             </ng-template>`
    //     },
    //     escapeHits: true,
    //     cssClasses: {
    //       root: 'app-hits',
    //       empty: 'app-hits-empty',
    //       item: 'app-hits-item'
    //     }
    //   })
    // );

    this.search.addWidget(
      pagination({
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
      })
    );

    this.search.start();
  }

  searchSwitch() {
    this.isJobs = true;
    // this.search.dispose();
    this.renderer.setElementStyle(this.btn.nativeElement, "display", "none");
    this.renderer.setElementStyle(this.btn2.nativeElement, "display", "inline");
    const info = connectHits(this.updateState);
    this.search2.addWidget(info());

    this.search2.addWidget(
      searchBox({
        container: '#search-box',
        cssClasses: {
          root: 'app-search-box',
          input: 'app-search-box-input'
        }
      })
    );

    this.search2.addWidget(
      hitsPerPageSelector({
        container: '#hitsPer2',
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
      })
    );
    
    // this.search2.addWidget( 
    //   hits({
    //     container: '#hits2',
    //     hitsPerPage: 10,
    //     templates: {
    //       empty: 'No results',
    //       item: 
    //             `<ng-template>
    //               <div class="is-hits-root">
    //                 <ul>
    //                     <a href='/job/{{id}}'>Job Title: {{{_highlightResult.title.value}}}</a></br>
    //                     Posted By: {{name}}
    //                 </ul>
    //               </div>
    //             </ng-template>`
    //     },
    //     escapeHits: true,
    //     cssClasses: {
    //       root: 'app-hits',
    //       empty: 'app-hits-empty',
    //       item: 'app-hits-item'
    //     }
    //   })
    // );

    this.search2.addWidget(
      pagination({
        container: '#pagination2',
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
      })
    );

    this.search2.start();
  }
 
  searchUsers() {
    this.isJobs = false;
    this.search2.dispose();
    
    this.renderer.setElementStyle(this.btn.nativeElement, "display", "inline");
    this.renderer.setElementStyle(this.btn2.nativeElement, "display", "none");
   const info = connectHits(this.updateState);
    this.search.addWidget(info());
    this.search.addWidget(
      searchBox({
        container: '#search-box',
        cssClasses: {
          root: 'app-search-box',
          input: 'app-search-box-input'
        }
      })
    );

    this.search.addWidget(
      hitsPerPageSelector({
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
      })
    );
      
      // this.search.addWidget( 
      //   hits({
      //     container: '#hits',
      //     hitsPerPage: 10,
      //     templates: {
      //       empty: 'No results',
      //       item: 
      //             `<ng-template>
      //                 <div class="is-hits-root">
      //                 <ul>
      //                   <img src={{img}}>
      //                   <span>
      //                     <a href='/profile/{{id}}'>User: {{{_highlightResult.name.value}}}</a></br>
      //                     Email: {{{_highlightResult.email.value }}}</br>
      //                     {{city}}, {{state}}
      //                   </span>  
      //                 </ul>
      //                 </div>
      //               </ng-template>`
      //     },
      //     escapeHits: true,
      //     cssClasses: {
      //       root: 'app-hits',
      //       empty: 'app-hits-empty',
      //       item: 'app-hits-item'
      //     }
      //   })
      // );

      this.search.addWidget(
        pagination({
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
        })
      );
  }
  updateState = (state, isFirstRendering) => {
    // asynchronous update of the state
    // avoid `ExpressionChangedAfterItHasBeenCheckedError`
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }

    this.state = state;
    console.log(state);
  }
}
