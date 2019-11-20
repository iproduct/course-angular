import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StateSelectorComponent } from './state-selector.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, StateSelectorComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
