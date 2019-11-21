import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { CoreModule } from '../core/core.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsModule } from './products.module';
import { Product } from './product.model';
import { PRODUCTS } from './mock-products';
import { BASE_API_URL } from '../core/backend-http.service';


describe('ProductsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      providers: [ProductsService],
      // Provide the service-under-test and its dependencies
      imports: [HttpClientModule]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    productsService = TestBed.get(ProductsService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  describe('#getHeroes', () => {
    let expectedProducts: Product[];

    beforeEach(() => {
      productsService = TestBed.get(ProductsService);
      expectedProducts = PRODUCTS as Product[];
    });

    it('should return expected products (called once)', () => {

      productsService.findAll().subscribe(
        products => expect(products).toEqual(expectedProducts, 'should return expected products'),
        fail
      );

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(`${BASE_API_URL}/products`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedProducts);
    });
  });
});
