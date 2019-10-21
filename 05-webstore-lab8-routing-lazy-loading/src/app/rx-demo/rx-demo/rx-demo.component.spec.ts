import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxDemoComponent } from './rx-demo.component';

describe('RxDemoComponent', () => {
  let component: RxDemoComponent;
  let fixture: ComponentFixture<RxDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
