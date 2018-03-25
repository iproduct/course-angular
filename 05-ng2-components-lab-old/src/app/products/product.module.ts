import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { NgModule }     from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent }   from './product-list.component';
import { ProductService }         from './product.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ ProductService ],
  declarations: [
    ProductDetailComponent,
    ProductListComponent
  ],
  exports: [
    ProductDetailComponent,
    ProductListComponent
  ]
})
export class ProductModule { }
