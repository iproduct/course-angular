/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from './product.service';
import { Logger } from '../shared/logger.service';
import { BackendService } from '../shared/backend.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, SharedModule],
      declarations: [ProductListComponent, ProductDetailComponent],
      providers: [ProductService, Logger,
        { provide: BackendService, useClass: BackendService}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    // Get BackendService actually injected into the component
    // productService = fixture.debugElement.injector.get(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
