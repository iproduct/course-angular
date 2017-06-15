import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestListComponent } from './test-list.component';
import { TestService } from '../test.service';
import { Logger } from '../../common/logger.service';
import { Test } from '../test.model';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendObservableService } from '../../common/backend-observable.service';
import { BackendHttpObservableService } from '../../common/backend-http-observable.service';
import { Http, HttpModule } from '@angular/http';
import { API_BASE_URL } from '../../common/common-types';

let comp: TestListComponent;
let fixture: ComponentFixture<TestListComponent>;
let spy1: jasmine.Spy;
let de: DebugElement;
let el: HTMLElement;
let testService: TestService;

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
      providers: [ Logger,
        { provide: BackendObservableService, useClass: BackendHttpObservableService},
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
    testService = fixture.debugElement.injector.get(TestService);

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
