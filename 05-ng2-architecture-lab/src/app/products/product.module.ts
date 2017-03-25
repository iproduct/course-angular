import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [ProductListComponent, ProductDetailComponent],
  exports: [ProductListComponent],
  providers: [ProductService]
})
export class ProductModule { }
