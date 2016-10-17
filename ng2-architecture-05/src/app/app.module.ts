import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { NgModule }     from '@angular/core';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent }   from './product-list.component';
import { ProductService }         from './product.service';
import { BackendService }      from './backend.service';
import { Logger }              from './logger.service';
import { SalesModule } from './sales/sales.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SalesModule
  ],
  providers: [
    BackendService,
    ProductService,
    Logger
  ],
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  exports: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
