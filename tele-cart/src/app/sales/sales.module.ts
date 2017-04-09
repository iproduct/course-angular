import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesTaxComponent } from './sales-tax.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SalesTaxComponent],
  exports: [SalesTaxComponent]
})
export class SalesModule { }
