import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleReactiveComponent } from './simple-reactive.component';

describe('SimpleReactiveComponent', () => {
  let component: SimpleReactiveComponent;
  let fixture: ComponentFixture<SimpleReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
