import instantsearch from 'instantsearch.js/es';
import { searchBox, hits, pagination, hitsPerPageSelector, clearAll } from 'instantsearch.js/es/widgets';
import { connectHits } from 'instantsearch.js/es/connectors';

export class BaseSearch {
    results;
    protected widgets = {
        search: null,
        hits: null,
        pagination: null
    };
    searchTypes: { USERS: string; JOBS: string; } = {
        USERS: 'USERS',
        JOBS: 'JOBS'
    };
    info: any;

    hitStream = (results, isFirstRendering) => {
        if (isFirstRendering) {
          return Promise.resolve().then(() => {
            this.results = results;
          });
        }
    
        this.results = results;
    }

    initializeWidgets() {
        if (!!instantsearch) {
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

            this.info = connectHits(this.hitStream);
        } else {
            alert('algolia is not loaded');
        }
    }
}