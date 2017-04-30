import { NgModule }     from '@angular/core';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    BrowserModule,
    DirectivesModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
