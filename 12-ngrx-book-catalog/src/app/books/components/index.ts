import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BookAuthorsComponent } from '../../books/components/book-authors.component';
import { BookDetailComponent } from '../../books/components/book-detail.component';
import { BookPreviewComponent } from '../../books/components/book-preview.component';
import { BookPreviewListComponent } from '../../books/components/book-preview-list.component';
import { BookSearchComponent } from '../../books/components/book-search.component';

import { PipesModule } from '../../shared/pipes';
import { MaterialModule } from '../../material';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
