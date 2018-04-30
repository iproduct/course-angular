import { NgModule }     from '@angular/core';
import { AppComponent } from './app.component';
import { SalesModule } from './sales/sales.module';
import { CommonModule } from './common/common.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/users.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SmallDemosModule } from './small-demos/small-demos.module';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    HomeModule,
    ProductModule,
    UserModule,
    SalesModule,
    SmallDemosModule
  ],
  declarations: [AppComponent, AppNavComponent],
  exports: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
