import { TestBed } from '@angular/core/testing';

import { BackendPromiseService } from './backend-promise.service';

describe('BackendPromiseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendPromiseService = TestBed.get(BackendPromiseService);
    expect(service).toBeTruthy();
  });
});
