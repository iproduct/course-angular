import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { TruncatePipe } from './truncate.pipe';
import { HeroAsyncMessageComponent } from './hero-async-message.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [ExponentialStrengthPipe, TruncatePipe, HeroAsyncMessageComponent],
  exports: [ExponentialStrengthPipe, TruncatePipe]
})
export class PipesModule { }
