import { TestBed } from '@angular/core/testing';

import { ProductsObservableService } from './products-observable.service';

describe('ProductsObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsObservableService = TestBed.get(ProductsObservableService);
    expect(service).toBeTruthy();
  });
});
