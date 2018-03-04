import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ProductListComponent, ProductDetailComponent],
  exports: [ProductListComponent, ProductDetailComponent],
  providers: [ProductService]
})
export class ProductsModule {}
