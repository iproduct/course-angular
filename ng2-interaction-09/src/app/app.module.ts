import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { InteractionModule } from './interaction/interaction.module';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav.component';
import { WikiModule } from './wiki/wiki.module';
import { HomeModule } from './home/home.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HomeModule,
    WikiModule,
    InteractionModule,
    PipesModule
  ],
  declarations: [AppComponent, AppNavComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
