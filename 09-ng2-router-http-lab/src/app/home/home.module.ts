import { NgModule }     from '@angular/core';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { WikiSmartComponent } from '../wiki/wiki.component';
import { WikipediaService } from '../wiki/wikipedia.service';
import { HttpModule, JsonpModule} from '@angular/http';
import { LogOnClickDirective } from './click.directive';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [HomeComponent, WikiSmartComponent, LogOnClickDirective],
  exports: [HomeComponent],
  providers: [WikipediaService]
})
export class HomeModule { }
