import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
