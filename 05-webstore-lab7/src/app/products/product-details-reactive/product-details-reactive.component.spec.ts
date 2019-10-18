import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsReactiveComponent } from './product-details-reactive.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsReactiveComponent;
  let fixture: ComponentFixture<ProductDetailsReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
