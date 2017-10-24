import { TestBed, inject } from '@angular/core/testing';

import { BackendPromiseHttpService } from './backend-promise-http.service';

describe('BackendPromiseHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendPromiseHttpService]
    });
  });

  it('should be created', inject([BackendPromiseHttpService], (service: BackendPromiseHttpService) => {
    expect(service).toBeTruthy();
  }));
});
