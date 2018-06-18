/*
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs/Rx';
import { WikipediaService } from './wikipedia.service';
import { URLSearchParams } from '@angular/http';

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
  public items$: Observable<string[]> = this.searchTermStream
    .debounceTime(1000)
    .map(search => search.trim())
    .filter(search => search.length > 2)
    .distinctUntilChanged()
    .switchMap((term: string) => this.wikipediaService.search(term));

  constructor(private wikipediaService: WikipediaService) { }
  public search(term: string) { this.searchTermStream.next(term); }

}
