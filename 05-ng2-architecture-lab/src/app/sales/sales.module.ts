import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import { SalesTaxComponent } from './sales-tax.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [SalesTaxComponent],
  exports: [SalesTaxComponent]
})
export class SalesModule { }
