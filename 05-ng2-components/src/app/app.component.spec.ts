import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductListComponent } from './products/product-list.component';
import { SalesTaxComponent } from './sales/sales-tax.component';
import { FormsModule } from '@angular/forms';
import { BackendService } from './core/backend.service';
import { ProductService } from './products/product.service';
import { Logger } from './core/logger.service';
import { SalesTaxRateService } from './sales/sales-tax-rate.service';
import { SalesTaxService } from './sales/sales-tax.service';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FormsModule],
      providers: [BackendService, ProductService, Logger, SalesTaxService, SalesTaxRateService],
      declarations: [AppComponent, ProductDetailComponent, ProductListComponent, SalesTaxComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
