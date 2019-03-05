import { TestBed, inject } from '@angular/core/testing';

import { BackendObservableService } from './backend-observable.service';

describe('BackendObservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendObservableService]
    });
  });

  it('should be created', inject([BackendObservableService], (service: BackendObservableService) => {
    expect(service).toBeTruthy();
  }));
});
