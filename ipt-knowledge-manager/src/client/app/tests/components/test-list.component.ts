/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, OnInit, OnDestroy, HostBinding, NgZone, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { Test, Difficulty } from '../test.model';
import { TestService } from '../test.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { slideInDownAnimation } from '../../shared/animations';
import { IdentityType } from '../../shared/shared-types';
import { Store } from '@ngrx/store';
import { TestActions } from '../test.actions';import { RootState } from '../test.module';
import { getTests, getTestsLoading, getSelectedTestId } from '../test.selectors';


@Component({
  // moduleId: module.id,
  selector: 'ipt-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
  animations: [slideInDownAnimation]
})
export class TestListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'absolute';

  public tests$: Observable<Test[]>;
  public loading$: Observable<boolean>;
  public selectedId$: Observable<IdentityType>;
  public firstRecord = 0;
  public errorMessage: string;
  private subscription: Subscription;

  constructor(
    private store: Store<RootState>,
    private testActions: TestActions) {
    this.tests$ = store.select(getTests);
    this.loading$ = store.select(getTestsLoading);
    this.selectedId$ = store.select(getSelectedTestId);
  }

  public ngOnInit() {
    this.store.dispatch(this.testActions.loadTests());
    this.subscription = this.selectedId$
      .filter(id => !!id)
      .subscribe(id => this.store.dispatch(go(['tests', id])));
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public selectTest(test: Test) {
    this.store.dispatch(this.testActions.selectTest(test.id));
  }

  public deleteTest(testId: string) {
    console.log('Deleting test ID: ', testId);
    this.store.dispatch(this.testActions.deleteTest(testId));
  }

  public addNewTest() {
    this.store.dispatch(this.testActions.selectTest(null));
    this.store.dispatch(go(['tests', 'new']));
  }

  public paginate(event) {
    this.firstRecord = event.first;
  }

  public getDifficulty(test: Test): string {
    return Difficulty[test.difficulty];
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
