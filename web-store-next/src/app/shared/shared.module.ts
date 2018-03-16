import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { FormDemoComponent } from './form-demo.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FormDemoComponent, RouteNotFoundComponent],
  exports: [FormDemoComponent, RouteNotFoundComponent]
})
export class SharedModule { }
