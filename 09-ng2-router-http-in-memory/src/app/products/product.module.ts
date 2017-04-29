import {CommonModule} from '@angular/common';
import { ReactiveFormsModule }         from '@angular/forms';
import { NgModule }     from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent }   from './product-list.component';
import { ProductService }         from './product.service';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule
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
