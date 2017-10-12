import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [BrowserModule, FormsModule, SharedModule],
  declarations: [ProductListComponent, ProductDetailComponent],
  exports: [ProductListComponent],
  providers: [ProductService]
})
export class ProductModule { }