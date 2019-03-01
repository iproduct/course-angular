import { TestBed } from '@angular/core/testing';

import { BackendMockService } from './backend-mock.service';

describe('BackendMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendMockService = TestBed.get(BackendMockService);
    expect(service).toBeTruthy();
  });
});
