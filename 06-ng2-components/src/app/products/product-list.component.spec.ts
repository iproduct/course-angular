import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { BackendService } from '../common/backend.service';
import { ProductService } from './product.service';
import { Logger } from '../common/logger.service';
import { Product } from './product.model';

let comp: ProductListComponent;
let fixture: ComponentFixture<ProductListComponent>;
let spy: jasmine.Spy;
let de: DebugElement;
// let el: HTMLElement;
let backendService: BackendService;

const testProducts = [new Product('Test Product', 10.50, 'Test product description')];

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [BackendService, ProductService, Logger],
      declarations: [ProductDetailComponent, ProductListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(ProductListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    backendService = fixture.debugElement.injector.get(BackendService);

    // Setup spy on the `getQuote` method
    spy = spyOn(backendService, 'getAll')
      .and.returnValue(Promise.resolve(testProducts));

    // Get the Twain quote element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.items'));
    // el = de.nativeElement;
  });

  it('should be ProductListComponent', () => {
    expect(fixture.componentInstance instanceof ProductListComponent).toBe(true, 'should create AppComponent');
  });

  it('should call getAll() products', () => {
    expect(de.children.length).toBe(0, 'should be no products yet');
    fixture.detectChanges();
    // getAll service is async => still has not returned with productss
    expect(de.children.length).toBe(0, 'no products yet');
    expect(spy.calls.any()).toBe(true, 'getAll called');
  });

  it('should show one product after getAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(de.children.length).toBe(1, 'should be shown one product');
    expect(de.children[0].nativeElement.textContent).toContain('Test Product', 'should contain "Test Product"');
  }));
});
