/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TestActions } from './test.actions';
import { State } from '../reducers';
import { TestService } from './test.service';
import { ApplicationError } from '../common/common-types';
import { Test } from './test.model';

@Injectable()

export class TestEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private testActions: TestActions,
    private testService: TestService
  ) { }

  @Effect() load$ = this.actions$
    .ofType(TestActions.LOAD_TESTS)
    .map(action => action.payload)
    .switchMap(() => this.testService.findAllTests()
      .mergeMap(tests => Observable.of(
        this.testActions.loadTestsSuccess(tests)
      ))
      .catch((err) => Observable.of(
        this.testActions.loadTestsFailure(new ApplicationError<Test>(err, null, Test))
      ))
    );

  @Effect() loadTest$ = this.actions$
    .ofType(TestActions.LOAD_TEST)
    .map(action => action.payload)
    .switchMap(testId => {
      return this.store
        .select(state => state.tests).take(1)
        .flatMap(tests => {
          const test = tests.entities[testId];
          if (test) {
            return (Observable.of(this.testActions.loadTestSuccess(test)));
          } else {
            return this.testService.findTest(testId)
              .mergeMap(foundTest => Observable.of(
                this.testActions.loadTestSuccess(foundTest)
              ))
              .catch(err => Observable.of(
                this.testActions.loadTestFailure(new ApplicationError<Test>(err, testId, Test))
              ))
          }
        });
    });

  @Effect() add$ = this.actions$
    .ofType(TestActions.ADD_TEST)
    .map(action => action.payload)
    .switchMap(test =>
      this.testService.addTest(test)
        .mergeMap(createdTest => Observable.of(
          this.testActions.addTestSuccess(createdTest)
        ))
        .catch(err => Observable.of(
          this.testActions.deleteTestFailure(new ApplicationError<Test>(err, null, Test, test))
        ))
    );

  @Effect() edit$ = this.actions$
    .ofType(TestActions.EDIT_TEST)
    .map(action => action.payload)
    .switchMap(test =>
      this.testService.editTest(test)
        .mergeMap(editedTest => Observable.of(
          this.testActions.editTestSuccess(editedTest)
        ))
        .catch(err => Observable.of(
          this.testActions.deleteTestFailure(new ApplicationError<Test>(err, test.id, Test, test))
        ))
    );

  @Effect() delete$ = this.actions$
    .ofType(TestActions.DELETE_TEST)
    .map(action => action.payload)
    .switchMap(testId =>
      this.testService.deleteTest(testId)
        .mergeMap(test => Observable.of(
          this.testActions.deleteTestSuccess(test)
        ))
        .catch(err => Observable.of(
          this.testActions.deleteTestFailure(new ApplicationError<Test>(err, testId, Test))
        ))
    );

}
