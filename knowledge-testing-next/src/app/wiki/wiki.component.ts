import { Component, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WikipediaService } from './wikipedia.service';
import { URLSearchParams } from '@angular/http';
import { slideInDownAnimation } from '../shared/animations';

@Component({
  selector: 'kt-wiki',
  styles: [`
    .demo {
      padding: 30px;
    }
    :host {
      display: block;
      width: 100%;
      position: absolute;
    }
    `],
  template: `
    <div class="demo">
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
    </div>
  `,
  animations: [slideInDownAnimation],
  providers: [WikipediaService]
})
export class WikiComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;

  private searchTermStream = new Subject<string>();
  public items: Observable<string[]> = this.searchTermStream
    .debounceTime(1000)
    .map(term => term.trim())
    .distinct()
    .switchMap((term: string) => this.wikipediaService.search(term));

  constructor(private wikipediaService: WikipediaService) { }
  public search(term: string) { this.searchTermStream.next(term); }

}
