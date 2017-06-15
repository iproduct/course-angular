import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DataListModule } from 'primeng/primeng';
import { MdSelectModule, MdInputModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';

import { TestDetailComponent } from './components/test-detail.component';
import { TestListComponent } from './components/test-list.component';
import { TestService } from './test.service';
import { TestRoutingModule } from './test-routing.module';
import { TestEffects } from './test.effects';
import { TestActions } from './test.actions';
import { TestResolver } from './test-resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestRoutingModule,
    DataListModule,
    MdSelectModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    EffectsModule.run(TestEffects),
  ],
  providers: [
    TestService,
    TestActions,
    TestResolver
  ],
  declarations: [
    TestDetailComponent,
    TestListComponent
  ],
  exports: [
    TestDetailComponent,
    TestListComponent
  ]
})
export class TestModule { }
