import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo01Component } from './demo01.component';

describe('Demo01Component', () => {
  let component: Demo01Component;
  let fixture: ComponentFixture<Demo01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
