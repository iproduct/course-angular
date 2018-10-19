import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../books/components';
import { BookEffects } from '../books/effects/book.effects';
import { CollectionEffects } from '../books/effects/collection.effects';

import { FindBookPageComponent } from '../books/containers/find-book-page.component';
import { ViewBookPageComponent } from '../books/containers/view-book-page.component';
import { SelectedBookPageComponent } from '../books/containers/selected-book-page.component';
import { CollectionPageComponent } from '../books/containers/collection-page.component';
import { MaterialModule } from '../material';

import { reducers } from '../books/reducers';
import { BooksRoutingModule } from '../books/books-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    BooksRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('books', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ],
  declarations: [
    FindBookPageComponent,
    ViewBookPageComponent,
    SelectedBookPageComponent,
    CollectionPageComponent,
  ],
})
export class BooksModule {}
