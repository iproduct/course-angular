import { TestBed, inject } from '@angular/core/testing';

import { BackendHttpService } from './backend-http.service';

describe('BackendHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendHttpService]
    });
  });

  it('should be created', inject([BackendHttpService], (service: BackendHttpService) => {
    expect(service).toBeTruthy();
  }));
});
