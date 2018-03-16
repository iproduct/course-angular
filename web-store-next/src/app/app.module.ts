import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { SalesModule } from './sales/sales.module';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav.component';
import { SmallDemosModule } from './small-demos/small-demos.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    UsersModule,
    HomeModule,
    SalesModule,
    SmallDemosModule,
    LoginModule
  ],
  providers: [],
  declarations: [
    AppComponent,
    AppNavComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
