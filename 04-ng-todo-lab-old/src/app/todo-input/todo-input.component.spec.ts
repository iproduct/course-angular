/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodoInputComponent } from './todo-input.component';

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
