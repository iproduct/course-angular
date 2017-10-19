import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { TestsModule } from './tests/tests.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    HomeModule,
    UsersModule,
    TestsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
