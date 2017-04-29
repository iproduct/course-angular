import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SalesTaxComponent } from './sales-tax.component';
import { SalesTaxService } from './sales-tax.service';
import { SalesTaxRateService } from './sales-tax-rate.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    SalesTaxService,
    SalesTaxRateService
  ],
  declarations: [
    SalesTaxComponent
  ],
  exports: [SalesTaxComponent]
})
export class SalesModule { }
