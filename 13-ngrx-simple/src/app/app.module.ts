import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer, reducers } from './counter';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      initialState: {
        counter: 0
      }
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
