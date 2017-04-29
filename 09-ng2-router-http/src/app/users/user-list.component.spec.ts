import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserDetailComponent } from './user-detail.component';
import { UserListComponent } from './user-list.component';

import { FormsModule } from '@angular/forms';
import { BackendService } from '../common/backend.service';
import { UserService } from './user.service';
import { Logger } from '../common/logger.service';
import { Admin, Gender } from './user.model';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/router-stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendMockService } from '../common/backend-mock.service';

let comp: UserListComponent;
let fixture: ComponentFixture<UserListComponent>;
let spy: jasmine.Spy;
let de: DebugElement;
// let el: HTMLElement;
let backendService: BackendService;

const testUsers = [new Admin('11111111111111111111111', 'Brian', 'Harisson', Gender.MALE, 'brian@gmail.com', 'brian')];

describe('user-list.component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [UserService, Logger,
        { provide: BackendService, useClass: BackendMockService},
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      declarations: [UserDetailComponent, UserListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(UserListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    backendService = fixture.debugElement.injector.get(BackendService);

    // Setup spy on the `getQuote` method
    spy = spyOn(backendService, 'findAll')
      .and.returnValue(Promise.resolve(testUsers));

    // Get the Twain quote element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.items'));
    // el = de.nativeElement;
  });

  it('should be UserListComponent', () => {
    expect(fixture.componentInstance instanceof UserListComponent).toBe(true, 'should create AppComponent');
  });

  it('should call findAll() users', () => {
    expect(de.children.length).toBe(0, 'should be no users yet');
    fixture.detectChanges();
    // findAll service is async => still has not returned with userss
    expect(de.children.length).toBe(0, 'no users yet');
    // expect(spy.calls.any()).toBe(true, 'findAll called');
  });

  it('should show one user after findAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(de.children.length).toBe(1, 'should be shown one user');
    expect(de.children[0].nativeElement.textContent).toContain('Brian Harisson', 'should contain "Brian Harisson"');
  }));
});
