import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Test } from './test.model';
import { TestService } from './test.service';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs/Rx';
import { TestActions } from './test.actions';
import { ApplicationError } from '../common/common-types';

@Injectable()
export class TestResolver implements Resolve<Test> {
  constructor(private store: Store<State>, private testService: TestService, private testActions: TestActions, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Test> {
    const testId = route.params['id'];
    return this.store.select(fromRoot.getTestsState).take(1)
      .flatMap(tests => {
        const test = tests.entities[testId];
        if (test) {
          return (Observable.of(test));
        } else {
          return this.testService.findTest(testId)
            .switchMap(foundTest => {
              this.store.dispatch(this.testActions.loadTestSuccess(foundTest));
              return Observable.of(foundTest);
            })
            .catch(err => {
              this.store.dispatch(
                this.testActions.loadTestFailure(new ApplicationError<Test>(err, testId, Test)));
              throw err;
            })
        }
      });
  }
}
