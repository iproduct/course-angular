import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [ProductListComponent, ProductDetailComponent],
  exports: [ProductListComponent]
})
export class ProductsModule { }
