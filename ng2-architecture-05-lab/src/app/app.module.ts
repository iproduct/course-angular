import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, ProductListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
