import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [ProductListComponent, ProductDetailComponent],
  exports: [ProductListComponent]
})
export class ProductsModule { }
