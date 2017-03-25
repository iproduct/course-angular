import { NgModule }     from '@angular/core';
import { AppComponent } from './app.component';
import { SalesModule } from './sales/sales.module';
import { CommonModule } from './common/common.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/users.module';
import { SimpleFormComponent } from './simple.form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ProductModule,
    UserModule,
    SalesModule
  ],
  declarations: [AppComponent, SimpleFormComponent],
  exports: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
