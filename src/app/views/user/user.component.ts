import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { environment, environment2 } from "../../enviroment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('button') btn: ElementRef;
  @ViewChild('button2') btn2: ElementRef;
  search: any;
  search2 = instantsearch(environment2.algolia);
  
  constructor(private renderer: Renderer) { }

  ngOnInit() {
    const options = environment.algolia;
    const options2 = environment2.algolia;
    this.search = instantsearch(options);
    // this.search2 = instantsearch(options2);
    this.renderer.setElementStyle(this.btn2.nativeElement, "display", "none");

    this.search.addWidget(
      searchBox({
        container: '#search-box'
      })
    );

    this.search.addWidget(
      hitsPerPageSelector({
        container: '#hitsPer',
        items : [
          {value: 5, label: 'Show me 5 results', default: true},
          {value: 10, label: 'Show me 10 results'},
          {value: 15, label: 'Show me 15 results'},
        ]
      })
    );
    
    this.search.addWidget( 
      hits({
        container: '#hits',
        hitsPerPage: 10,
        templates: {
          empty: 'No results',
          item: 
                `<ng-template>
                  <div class="is-hits-root">
                    <ul>
                      <img style="width:100px;" src={{img}}></br>
                        <a href='/profile/{{id}}'>User: {{{_highlightResult.name.value}}}</a></br>
                        Email: {{{_highlightResult.email.value }}}</br>
                        {{city}}, {{state}}
                    </ul>
                  </div>
                </ng-template>`
        },
        escapeHits: true
      })
    );

    this.search.addWidget(
      pagination({
        container: '#pagination'
      })
    );

    this.search.start();
  }

  searchSwitch() {
   this.search.dispose();

   this.renderer.setElementStyle(this.btn.nativeElement, "display", "none");
   this.renderer.setElementStyle(this.btn2.nativeElement, "display", "inline");

   this.search2.addWidget(
    searchBox({
      container: '#search-box'
    })
  );

  this.search2.addWidget(
    hitsPerPageSelector({
      container: '#hitsPer2',
      items : [
        {value: 5, label: 'Show me 5 results', default: true},
        {value: 10, label: 'Show me 10 results'},
        {value: 15, label: 'Show me 15 results'},
      ]
    })
  );
    
    this.search2.addWidget( 
      hits({
        container: '#hits2',
        hitsPerPage: 10,
        templates: {
          empty: 'No results',
          item: 
                `<ng-template>
                  <div class="is-hits-root">
                    <ul>
                        <a href='/job/{{id}}'>Job Title: {{{_highlightResult.title.value}}}</a></br>
                        Posted By: {{name}}
                    </ul>
                  </div>
                </ng-template>`
        },
        escapeHits: true
      })
    );

    this.search2.addWidget(
      pagination({
        container: '#pagination2'
      })
    );

    this.search2.start();
  }
 
  searchUsers() {
    this.search2.dispose();
    
    this.renderer.setElementStyle(this.btn.nativeElement, "display", "inline");
    this.renderer.setElementStyle(this.btn2.nativeElement, "display", "none");

    this.search.addWidget(
      searchBox({
        container: '#search-box'
      })
    );

    this.search.addWidget(
      hitsPerPageSelector({
        container: '#hitsPer',
        items : [
          {value: 5, label: 'Show me 5 results', default: true},
          {value: 10, label: 'Show me 10 results'},
          {value: 15, label: 'Show me 15 results'},
        ]
      })
    );
      
      this.search.addWidget( 
        hits({
          container: '#hits',
          hitsPerPage: 10,
          templates: {
            empty: 'No results',
            item: 
                  `<ng-template>
                      <div class="is-hits-root">
                      <ul>
                        <img style="width:100px;" src={{img}}></br>
                          <a href='/profile/{{id}}'>User: {{{_highlightResult.name.value}}}</a></br>
                          Email: {{{_highlightResult.email.value }}}</br>
                          {{city}}, {{state}}
                      </ul>
                      </div>
                    </ng-template>`
          },
          escapeHits: true
        })
      );

      this.search.addWidget(
        pagination({
          container: '#pagination'
        })
      );


  }

}
