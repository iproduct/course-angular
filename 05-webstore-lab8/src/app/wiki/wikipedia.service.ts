﻿import {Injectable} from '@angular/core';
import { Observable, from, zip } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, toArray, tap, flatMap } from 'rxjs/operators';

export type ResultType = Array<[string, string, string]>;

@Injectable()
export class WikipediaService {
    constructor(private http: HttpClient) { }
    public search(term: string): Observable<ResultType> {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        const params = new HttpParams()
          .set('search', term) // the user's search value
          .set('action', 'opensearch')
          .set('format', 'json');
        wikiUrl += '?' + params.toString();
        console.log(wikiUrl);
        // TODO: Add error handling
        return this.http.jsonp(wikiUrl, 'callback').pipe(
          tap(data => console.log(data)),
          flatMap(data => zip(
              from(data[1] as string[] || []),
              from(data[2] as string[] || []),
              from(data[3] as string[] || [])
            ).pipe(
              // map(([t, desc, link]) => `${t} [${link}] - ${desc}`),
              tap(info => console.log(info)),
              toArray()
            )
          )
        );
    }
}
