import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { TestsModule } from './tests/tests.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    UiModule,
    HomeModule,
    UsersModule,
    TestsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
