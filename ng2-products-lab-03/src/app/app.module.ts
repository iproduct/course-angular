import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormDemoComponent } from './form-demo.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    AppComponent,
    FormDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // HomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
