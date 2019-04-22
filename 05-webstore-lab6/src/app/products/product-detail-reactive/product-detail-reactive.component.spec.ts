import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailReactiveComponent } from './product-detail-reactive.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailReactiveComponent;
  let fixture: ComponentFixture<ProductDetailReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
