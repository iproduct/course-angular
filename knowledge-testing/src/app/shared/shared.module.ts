import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [ErrorMessageComponent],
  exports: [ErrorMessageComponent]
})
export class SharedModule { }
