import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserDetailComponent } from './user-detail.component';
import { UserListComponent } from './user-list.component';

import { FormsModule } from '@angular/forms';
import { BackendService } from '../common/backend.service';
import { UserService } from './user.service';
import { Logger } from '../common/logger.service';
import { Admin } from './user.model';

let comp: UserListComponent;
let fixture: ComponentFixture<UserListComponent>;
let spy: jasmine.Spy;
let de: DebugElement;
// let el: HTMLElement;
let backendService: BackendService;

const testUsers = [new Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian')];

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [BackendService, UserService, Logger],
      declarations: [UserDetailComponent, UserListComponent]
    });

    // Create component
    fixture = TestBed.createComponent(UserListComponent);
    comp = fixture.componentInstance;

    // Get BackendService actually injected into the component
    backendService = fixture.debugElement.injector.get(BackendService);

    // Setup spy on the `getQuote` method
    spy = spyOn(backendService, 'getAll')
      .and.returnValue(Promise.resolve(testUsers));

    // Get the Twain quote element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.items'));
    // el = de.nativeElement;
  });

  it('should be UserListComponent', () => {
    expect(fixture.componentInstance instanceof UserListComponent).toBe(true, 'should create AppComponent');
  });

  it('should call getAll() users', () => {
    expect(de.children.length).toBe(0, 'should be no users yet');
    fixture.detectChanges();
    // getAll service is async => still has not returned with userss
    expect(de.children.length).toBe(0, 'no users yet');
    expect(spy.calls.any()).toBe(true, 'getAll called');
  });

  it('should show one user after getAll promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(de.children.length).toBe(1, 'should be shown one user');
    expect(de.children[0].nativeElement.textContent).toContain('Test User', 'should contain "Test User"');
  }));
});
