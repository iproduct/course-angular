import { TestBed } from '@angular/core/testing';

import { PromiseBackendMockService } from './promise-backend-mock.service';

describe('PromiseBackendMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromiseBackendMockService = TestBed.get(PromiseBackendMockService);
    expect(service).toBeTruthy();
  });
});
