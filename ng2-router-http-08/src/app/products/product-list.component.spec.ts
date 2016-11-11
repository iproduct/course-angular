import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { Logger } from '../common/logger.service';
import { Product } from './product.model';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteStub } from '../../testing/router-stubs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendObservableService } from '../common/backend-observable.service';
import { BackendHttpObservableService } from '../common/backend-http-observable.service';
import { APP_BASE_HREF } from '@angular/common';
import { Http, HttpModule } from '@angular/http';

let comp: ProductListComponent;
let fixture: ComponentFixture<ProductListComponent>;
let spy1: jasmine.Spy;
let spy2: jasmine.Spy;
let de: DebugElement;
let el: HTMLElement;
let productService: ProductService;

const testProducts = [new Product(1, 'Test Product', 10.50, 'Test product description')];

export class ProductServiceStub extends ProductService {
   constructor() {
    super(null, null);
   }
  public getProductsObservable (): Observable<Product[]> {
    return new BehaviorSubject(testProducts);
  }

  public getProductObservable(id: number): Observable<Product> {
    return Observable.from(testProducts);
  }

  public refreshProducts(): Promise<void> {
    return Promise.resolve();
  }

  public addProduct(product: Product): Promise<void> {
    return Promise.resolve();
  }

  public editProduct(product: Product): Promise<void> {
    return Promise.resolve();
  }

  public deleteProduct(productId: number): Promise<void> {
    return Promise.resolve();
  }
}


describe('products-list', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpModule],
      providers: [ Logger,
        { provide: BackendObservableService, useClass: BackendHttpObservableService},
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ProductService, useClass: ProductServiceStub },
        { provide: 'API_BASE_URL', useValue: '/api' }
      ],
      declarations: [ProductListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(ProductListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    productService = fixture.debugElement.injector.get(ProductService);

    // Setup spy on the `getQuote` method
    spy1 = spyOn(productService, 'getProductsObservable')
      .and.returnValue(new BehaviorSubject(testProducts));
    
    spy2 = spyOn(productService, 'refreshProducts')
      .and.returnValue(Promise.resolve());


    // Get the tested element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.items'));
    el = de.nativeElement;
  });

  it('should be ProductListComponent', () => {
    expect(fixture.componentInstance instanceof ProductListComponent).toBe(true, 'should create AppComponent');
    fixture.detectChanges();
  });

  it('should call getAll() products', () => {
    expect(de.children.length).toBe(0, 'should be no products yet');
    fixture.detectChanges();
    // getAll service is async => still has not returned with productss
    expect(de.children.length).toBe(1, 'should be shown one product');
    expect(de.children[0].nativeElement.textContent).toContain('Test Product', 'should contain "Test Product"');
    expect(spy1.calls.any()).toBe(true, 'getProductsObservable called');
    expect(spy2.calls.any()).toBe(true, 'refreshProducts called');
  });

  it('should show one product after getAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(de.children.length).toBe(1, 'should be shown one product');
    expect(de.children[0].nativeElement.textContent).toContain('Test Product', 'should contain "Test Product"');
    expect(spy1.calls.any()).toBe(true, 'getProductsObservable called');
    expect(spy2.calls.any()).toBe(true, 'refreshProducts called');
}));
});
