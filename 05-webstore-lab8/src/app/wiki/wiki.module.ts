import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WikiComponent } from './wiki.component';
import { WikipediaService } from './wikipedia.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  declarations: [WikiComponent],
  exports: [WikiComponent]
})
export class WikiModule { }
