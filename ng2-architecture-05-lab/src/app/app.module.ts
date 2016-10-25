import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { SalesModule } from './sales/sales.module';


@NgModule({
  imports: [BrowserModule, ProductModule, SalesModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
