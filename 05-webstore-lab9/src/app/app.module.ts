import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormModule } from './simple-form/simple-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { PROMISE_BACKEND } from './core/promise-backend.service';
import { PromiseBackendMockService } from './core/promise-backend-mock.service';
import { RxdemoModule } from './rxdemo/rxdemo.module';
import { WikiModule } from './wiki/wiki.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleFormModule,
    ProductsModule,
    BrowserAnimationsModule,
    RxdemoModule,
    WikiModule,
    SharedModule,
  ],
  providers: [{provide: PROMISE_BACKEND, useClass: PromiseBackendMockService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
