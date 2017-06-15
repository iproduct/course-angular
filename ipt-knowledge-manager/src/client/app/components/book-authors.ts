import { Component, Input } from '@angular/core';

import { Book } from '../models/book';


@Component({
  selector: 'ipt-book-authors',
  template: `
    <h5 md-subheader>Written By:</h5>
    <span>
      {{ authors | bcAddCommas }}
    </span>
  `,
  styles: [`
    h5 {
      margin-bottom: 5px;
    }
  `]
})
export class BookAuthorsComponent {
  @Input() book: Book;

  get authors() {
    return this.book.volumeInfo.authors;
  }
}
