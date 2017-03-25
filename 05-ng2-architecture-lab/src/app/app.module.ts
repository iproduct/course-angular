import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { SalesModule } from './sales/sales.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FormDemoComponent } from './form-demo.component';


@NgModule({
  imports: [BrowserModule, ProductModule, FormsModule, SalesModule, SharedModule],
  declarations: [AppComponent, FormDemoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
