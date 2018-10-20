/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DataListModule } from 'primeng/primeng';
import { MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule } from '@angular/material';

import { TestDetailComponent } from './components/test-detail.component';
import { TestListComponent } from './components/test-list.component';
import { TestService } from './test.service';
import { TestRoutingModule } from './test-routing.module';
import { TestEffects } from './test.effects';
import { TestActions } from './test.actions';
import { TestResolver } from './test-resolver';
import { RootState as OldRootState } from '../root.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { testsReducer, State as TestState } from './test.reducer';
import * as fromTests from './test.reducer';
import { SharedModule } from '../shared/shared.module';
import { UiModule } from '../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TestRoutingModule,
    DataListModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    UiModule,
    StoreModule.forFeature('tests', testsReducer),
    EffectsModule.forFeature([TestEffects])
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
export class TestModule {
  constructor() {
    // addReducer<TestState>('tests', testsReducer);
  }
}

export interface RootState extends OldRootState {
  tests: TestState;
}
