import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxComponent } from './sales-tax.component';

describe('SalesTaxComponent', () => {
  let component: SalesTaxComponent;
  let fixture: ComponentFixture<SalesTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
