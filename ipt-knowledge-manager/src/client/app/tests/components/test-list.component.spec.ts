/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestListComponent } from './test-list.component';
import { TestService } from '../test.service';
import { Test } from '../test.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { LoggerService } from '../../core/logger.service';
import { BackendService } from '../../core/backend.service';
import { BackendHttpService } from '../../core/backend-http.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { API_BASE_URL } from '../../shared/shared-types';

let comp: TestListComponent;
let fixture: ComponentFixture<TestListComponent>;
let spy1: jasmine.Spy;
let de: DebugElement;
let el: HTMLElement;

const testTests = [new Test('11111111111111111111111', 'test@gmail.com', 'Ivan', 2, 'ivan')];

export class TestServiceStub extends TestService {
   constructor() {
    super(null, null);
   }
  public findAllTests(): Observable<Test[]> {
    return new BehaviorSubject(testTests);
  }

  public findTest(id: string): Observable<Test> {
    return Observable.from(testTests);
  }

  public addTest(test: Test): Observable<Test> {
    return Observable.of(test);
  }

  public editTest(test: Test): Observable<Test> {
    return Observable.of(test);
  }

  public deleteTest(testId: string): Observable<Test> {
    return Observable.of(testTests[0]);
  }
}


describe('tests-list', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpModule, NoopAnimationsModule],
      providers: [ LoggerService,
        { provide: BackendService, useClass: BackendHttpService},
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: TestService, useClass: TestServiceStub },
        { provide: API_BASE_URL, useValue: '/api' }
      ],
      declarations: [TestListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(TestListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    const testService = fixture.debugElement.injector.get(TestService);

    // Setup spy on the `getQuote` method
    spy1 = spyOn(testService, 'findAllTests')
      .and.returnValue(new BehaviorSubject(testTests));

    // Get the tested element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.items'));
    el = de.nativeElement;
  });

  it('should be TestListComponent', () => {
    expect(fixture.componentInstance instanceof TestListComponent).toBe(true, 'should create TestListComponent');
    fixture.detectChanges();
  });

  it('should call getAll() tests', () => {
    expect(de.children.length).toBe(0, 'should be no tests yet');
    fixture.detectChanges();
    // getAll service is async => still has not returned with testss
    expect(de.children.length).toBe(1, 'should be shown one test');
    expect(de.children[0].nativeElement.textContent).toContain('Test Test', 'should contain "Test Test"');
    expect(spy1.calls.any()).toBe(true, 'getTestsObservable called');
  });

  it('should show one test after getAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(de.children.length).toBe(1, 'should be shown one test');
    expect(de.children[0].nativeElement.textContent).toContain('Test Test', 'should contain "Test Test"');
    expect(spy1.calls.any()).toBe(true, 'getTestsObservable called');
}));
});
