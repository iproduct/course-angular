import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {API_BASE_URL} from '../../common/common-types';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { Logger } from '../../common/logger.service';
import { User } from '../user.model';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendObservableService } from '../../common/backend-observable.service';
import { BackendHttpObservableService } from '../../common/backend-http-observable.service';
import { Http, HttpModule } from '@angular/http';

let comp: UserListComponent;
let fixture: ComponentFixture<UserListComponent>;
let spy1: jasmine.Spy;
let de: DebugElement;
let el: HTMLElement;
let userService: UserService;

const testUsers = [new User('11111111111111111111111', 'user@gmail.com', 'Ivan', 'Petrov', 'ivan')];

export class UserServiceStub extends UserService {
   constructor() {
    super(null, null);
   }
  public findAllUsers(): Observable<User[]> {
    return new BehaviorSubject(testUsers);
  }

  public findUser(id: string): Observable<User> {
    return Observable.from(testUsers);
  }

  public addUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  public editUser(user: User): Observable<User> {
    return Observable.of(user);
  }

  public deleteUser(userId: string): Observable<User> {
    return Observable.of(testUsers[0]);
  }
}


describe('users-list', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpModule, NoopAnimationsModule],
      providers: [ Logger,
        { provide: BackendObservableService, useClass: BackendHttpObservableService},
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: API_BASE_URL, useValue: '/api' }
      ],
      declarations: [UserListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(UserListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);

    // Setup spy on the `getQuote` method
    spy1 = spyOn(userService, 'findAllUsers')
      .and.returnValue(new BehaviorSubject(testUsers));

    // Get the tested element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.items'));
    el = de.nativeElement;
  });

  it('should be UserListComponent', () => {
    expect(fixture.componentInstance instanceof UserListComponent).toBe(true, 'should create UserListComponent');
    fixture.detectChanges();
  });

  it('should call getAll() users', () => {
    expect(de.children.length).toBe(0, 'should be no users yet');
    fixture.detectChanges();
    // getAll service is async => still has not returned with userss
    expect(de.children.length).toBe(1, 'should be shown one user');
    expect(de.children[0].nativeElement.textContent).toContain('Test User', 'should contain "Test User"');
    expect(spy1.calls.any()).toBe(true, 'getUsersObservable called');
  });

  it('should show one user after getAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(de.children.length).toBe(1, 'should be shown one user');
    expect(de.children[0].nativeElement.textContent).toContain('Test User', 'should contain "Test User"');
    expect(spy1.calls.any()).toBe(true, 'getUsersObservable called');
}));
});
