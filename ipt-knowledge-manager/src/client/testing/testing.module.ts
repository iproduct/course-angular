import {RouterLinkStubDirective,  RouterOutletStubComponent,  RouterStub, ActivatedRouteStub} from './router-stubs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    RouterLinkStubDirective,
    RouterOutletStubComponent
  ],
  providers: [RouterStub, ActivatedRouteStub],
  exports: [
    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ]
})
export class TestingModule { }
