import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsReactiveComponent } from './product-details-reactive/product-details-reactive.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductDetailsReactiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    ProductsListComponent,
    ProductDetailsComponent,
    ProductDetailsReactiveComponent
  ]
})
export class ProductsModule { }
