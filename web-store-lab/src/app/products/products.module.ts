import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsService } from './products.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailReactiveComponent } from './product-detail-reactive/product-detail-reactive.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductDetailReactiveComponent
  ],
  providers: [ProductsService],
  exports: [ProductListComponent]
})
export class ProductsModule { }
