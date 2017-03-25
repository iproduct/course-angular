import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmailValidator } from './email-validator.directive';
import { LogOnClickDirective } from '../home/click.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [EmailValidator, LogOnClickDirective, TooltipDirective],
  exports: [EmailValidator, LogOnClickDirective, TooltipDirective]
})
export class DirectivesModule { }
