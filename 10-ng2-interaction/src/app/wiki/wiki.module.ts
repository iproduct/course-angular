import { NgModule }     from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WikiComponent } from './wiki.component';
import { WikipediaService } from './wikipedia.service';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [WikiComponent],
  exports: [WikiComponent]
})
export class WikiModule { }
