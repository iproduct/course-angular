import {Injectable} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import {Jsonp, Response, URLSearchParams} from '@angular/http';
@Injectable()
export class WikipediaService {
    constructor(private jsonp: Jsonp) { }
    public search(term: string) {
        const wikiUrl = 'http://en.wikipedia.org/w/api.php';
        const params = new URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        // TODO: Add error handling
        return this.jsonp
            .get(wikiUrl, { search: params })
            .flatMap((response: Response) => {
               const resp = response.json();
               return Observable.from(<string[]> resp[1] || [])
                .zip(Observable.from(<string[]> resp[2] || []))
                .map(([t, desc], index) => `${t} - ${desc}`)
                .toArray();
            });
    }
}
