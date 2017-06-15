import { Component, Input } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'ipt-book-preview-list',
  template: `
    <ipt-book-preview *ngFor="let book of books" [book]="book"></ipt-book-preview>
  `,
  styles: [`
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
