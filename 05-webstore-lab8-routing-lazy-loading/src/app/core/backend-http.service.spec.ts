import { TestBed } from '@angular/core/testing';

import { BackendHttpService } from './backend-http.service';

describe('BackendHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendHttpService = TestBed.get(BackendHttpService);
    expect(service).toBeTruthy();
  });
});
