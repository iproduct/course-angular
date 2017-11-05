import { TestBed, inject } from '@angular/core/testing';

import { UserResolverService } from './user-resolver.service';

describe('UserResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserResolverService]
    });
  });

  it('should be created', inject([UserResolverService], (service: UserResolverService) => {
    expect(service).toBeTruthy();
  }));
});
