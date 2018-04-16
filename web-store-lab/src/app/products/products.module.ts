import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsService } from './products.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ProductListComponent, ProductDetailComponent],
  providers: [ProductsService],
  exports: [ProductListComponent]
})
export class ProductsModule { }
