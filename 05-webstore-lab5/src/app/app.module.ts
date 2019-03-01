import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleFormModule } from './simple-form/simple-form.module';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { RxDemoModule } from './rx-demo/rx-demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SimpleFormModule,
    ProductsModule,
    BrowserAnimationsModule,
    RxDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
