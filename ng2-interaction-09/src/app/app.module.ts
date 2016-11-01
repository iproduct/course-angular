import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SmallDemosModule } from './small-demos/small-demos.module';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav.component';
import { WikiModule } from './wiki/wiki.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    WikiModule,
    AppRoutingModule,
    SmallDemosModule
  ],
  declarations: [AppComponent, AppNavComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
