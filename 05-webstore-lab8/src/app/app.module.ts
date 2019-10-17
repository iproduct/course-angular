import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RxDemoModule } from './rx-demo/rx-demo.module';
import { WikiModule } from './wiki/wiki.module';
import { NavigationModule } from './navigation/navigation.module';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NavigationModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ProductsModule,
    BrowserAnimationsModule,
    RxDemoModule,
    WikiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
