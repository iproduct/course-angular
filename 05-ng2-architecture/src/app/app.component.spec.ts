import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { SalesTaxComponent } from './sales/sales-tax.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BackendService } from './backend.service';
import { ProductService } from './product.service';
import { Logger } from './logger.service';
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
