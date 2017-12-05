import { Component, OnInit } from '@angular/core';
import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector } from 'instantsearch.js/es/widgets';
import { environment } from "../../enviroment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  search: any;
  
  constructor() { }

  ngOnInit() {
    const options = environment.algolia;
    this.search= instantsearch(options);

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

 
 

}
