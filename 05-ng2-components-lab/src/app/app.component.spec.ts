import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductListComponent } from './products/product-list.component';
import { FormsModule } from '@angular/forms';
import { BackendService } from './core/backend.service';
import { ProductService } from './products/product.service';
import { LoggerService } from './core/logger.service';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FormsModule],
      providers: [BackendService, ProductService, LoggerService,],
      declarations: [AppComponent, ProductDetailComponent, ProductListComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
