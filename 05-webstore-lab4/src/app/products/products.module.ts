import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsService } from './products.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailReactiveComponent } from './product-detail-reactive/product-detail-reactive.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProductsListComponent, ProductDetailComponent, ProductDetailReactiveComponent],
  exports: [ProductsListComponent, ProductDetailComponent, ProductDetailReactiveComponent],
  providers: [ProductsService]
})
export class ProductsModule { }
