import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';

describe('ProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductsService],
    imports: [CoreModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });
});
