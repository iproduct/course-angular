import { Injectable } from '@angular/core';

import { Test } from './test.model';
import { BackendService } from '../core/backend.service';
import { Logger } from '../core/logger.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IdentityType } from '../shared/shared-types';

@Injectable()
export class TestService {

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public findAllTests(): Observable<Test[]> {
    return this.backend.findAll(Test);
  }

  public findTest(id: IdentityType): Observable<Test> {
    return this.backend.find(Test, id);
  }

 public addTest(test: Test): Observable<Test> {
    return this.backend.add(Test, test);
  }

  public editTest(test: Test): Observable<Test> {
    return this.backend.edit(Test, test);
  }

  public deleteTest(testId: string): Observable<Test> {
    return this.backend.delete(Test, testId);
  }

}
