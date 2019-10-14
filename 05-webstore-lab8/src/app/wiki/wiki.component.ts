import { Component } from '@angular/core';
// tslint:disable-next-line:no-submodule-imports
import { Observable, Subject } from 'rxjs';
import { WikipediaService } from './wikipedia.service';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ws-wiki',
  styles: [`
    .demo {
      padding: 30px;
    }
    `],
  template: `
    <div class="demo">
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items$ | async">{{item}}</li>
    </ul>
    </div>
  `,
  providers: [WikipediaService]
})
export class WikiComponent {
  private searchTermStream = new Subject<string>();
  public items$: Observable<string[]> = this.searchTermStream.pipe(
    debounceTime(500),
    map(search => search.trim()),
    distinctUntilChanged(),
    switchMap((term: string) => this.wikipediaService.search(term))
  );

  constructor(private wikipediaService: WikipediaService) { }
  public search(term: string) { this.searchTermStream.next(term); }

}
