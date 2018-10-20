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
import {API_BASE_URL} from '../../shared/shared-types';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { LoggerService } from '../../core/logger.service';
import { User } from '../user.model';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, HttpModule } from '@angular/http';
import { DataListModule } from 'primeng/primeng';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RoutingEffects } from '../../shared/routing.effects';
import { reducers } from '../../root.reducer';
import { usersReducer } from '../user.reducer';
import { UserEffects } from '../user.effects';
import { LoginService } from '../login.service';
import { UserActions } from '../user.actions';
import { UserResolver } from '../user-resolver';

let comp: UserListComponent;
let fixture: ComponentFixture<UserListComponent>;
// let spy1: jasmine.Spy;
let spyUserService: jasmine.SpyObj<any>;
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

// spyUserService = {
//   findAllUsers: jasmine.createSpy('findAllUsers').and.returnValue(new BehaviorSubject(testUsers))
// }

spyUserService = jasmine.createSpyObj('UserService', {'findAllUsers': new BehaviorSubject(testUsers)});


export class LoginServiceStub extends LoginService {
  logout(): Observable<string> {
    return Observable.empty();
  }
}


describe('users-list', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule,
        NoopAnimationsModule,
        DataListModule,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router'
        }),
        EffectsModule.forRoot([RoutingEffects]),
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UserEffects])
      ],
      providers: [ LoggerService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: UserService, useValue: spyUserService },
        { provide: LoginService, useClass: LoginServiceStub },
        { provide: API_BASE_URL, useValue: '/api' },
        UserActions,
        UserResolver,
      ],
      declarations: [UserListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(UserListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    userService = fixture.debugElement.injector.get(UserService);

    // Setup spy on the `getQuote` method
    // spy1 = spyOn(userService, 'findAllUsers').and.returnValue(new BehaviorSubject(testUsers));

    // Get the tested element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('ul'));
    el = de.nativeElement;
  });

  it('should be UserListComponent', () => {
    expect(fixture.componentInstance instanceof UserListComponent).toBe(true, 'should create UserListComponent');
    fixture.detectChanges();
  });

  it('should call findAllUsers()', () => {
    expect(de.children.length).toBe(0, 'should be no users yet');
    fixture.detectChanges();
    // getAll service is async => still has not returned with users
    expect(de.children.length).toBe(1, 'should be shown one user');
    expect(de.children[0].nativeElement.textContent).toContain(
      `${testUsers[0].fname} ${testUsers[0].lname}`, 'should contain test user name');
      expect(spyUserService.findAllUsers.calls.any()).toBe(true, 'getUsersObservable called');
      // expect(spy1.calls.any()).toBe(true, 'getUsersObservable called');
    });

  it('should show one user after getAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async findAllUsers
    fixture.detectChanges(); // update view with users
    expect(de.children.length).toBe(1, 'should be shown one user');
    expect(de.children[0].nativeElement.textContent).toContain(
      `${testUsers[0].fname} ${testUsers[0].lname}`, 'should contain test user name');
    expect(spyUserService.findAllUsers.calls.any()).toBe(true, 'getUsersObservable called');
    // expect(spy1.calls.any()).toBe(true, 'getUsersObservable called');
}));
});
