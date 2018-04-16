import { TestBed, inject } from '@angular/core/testing';

import { BackendMockService } from './backend-mock.service';

describe('BackendMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendMockService]
    });
  });

  it('should be created', inject([BackendMockService], (service: BackendMockService) => {
    expect(service).toBeTruthy();
  }));
});
