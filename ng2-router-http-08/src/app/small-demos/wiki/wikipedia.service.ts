import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';
@Injectable()
export class WikipediaService {
    constructor(private jsonp: Jsonp) { }
    search(term: string) {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        var params = new URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(request => <string[]>request.json()[1]);
    }
}