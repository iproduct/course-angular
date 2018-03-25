import { NgModule }     from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProductModule } from './products/product.module';
import { SimpleFormComponent } from './simple.form.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    ProductModule
  ],
  declarations: [AppComponent, SimpleFormComponent],
  exports: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
