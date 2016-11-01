import { NgModule }     from '@angular/core';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { LogOnClickDirective } from './click.directive';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [HomeComponent, LogOnClickDirective],
  exports: [HomeComponent]
})
export class HomeModule { }
