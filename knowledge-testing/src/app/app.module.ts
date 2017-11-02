import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UiModule } from './ui/ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { TestsModule } from './tests/tests.module';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { ReactiveDemoModule } from './reactive-demo/reactive-demo.module';
import { WikiModule } from './wiki/wiki.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    UiModule,
    HomeModule,
    UsersModule,
    TestsModule,
    ReactiveDemoModule,
    WikiModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
