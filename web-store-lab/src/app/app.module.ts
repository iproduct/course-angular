import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
import { WikiModule } from './wiki/wiki.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ProductsModule,
    WikiModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
