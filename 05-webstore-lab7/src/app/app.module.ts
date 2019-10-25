import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SimpleFormModule } from './simple-form/simple-form.module';
import { RxDemoModule } from './rx-demo/rx-demo.module';
import { WikiModule } from './wiki/wiki.module';
import { UsersModule } from './users/users.module';
import { NavigationModule } from './navigation/navigation.module';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    NavigationModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ProductsModule,
    UsersModule,
    SimpleFormModule,
    RxDemoModule,
    WikiModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
