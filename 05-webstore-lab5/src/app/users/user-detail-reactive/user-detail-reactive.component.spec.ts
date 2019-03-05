import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailReactiveComponent } from './user-detail-reactive.component';

describe('UserDetailReactiveComponent', () => {
  let component: UserDetailReactiveComponent;
  let fixture: ComponentFixture<UserDetailReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
