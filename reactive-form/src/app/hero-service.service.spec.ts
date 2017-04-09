import { TestBed, inject } from '@angular/core/testing';

import { HeroServiceService } from './hero-service.service';

describe('HeroServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroServiceService]
    });
  });

  it('should ...', inject([HeroServiceService], (service: HeroServiceService) => {
    expect(service).toBeTruthy();
  }));
});
