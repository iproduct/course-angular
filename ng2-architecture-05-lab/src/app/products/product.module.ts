import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [ProductListComponent, ProductDetailComponent],
  exports: [ProductListComponent]
})
export class ProductModule { }
