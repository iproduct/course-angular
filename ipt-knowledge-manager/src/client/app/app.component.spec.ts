/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducers} from './root.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoutingEffects } from './shared/routing.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerService } from './core/logger.service';
import { ActivatedRouteStub } from '../testing';
import { UserService } from './users/user.service';
import { UserServiceStub } from './users/components/user-list.component.spec';
import { API_BASE_URL } from './shared/shared-types';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        UiModule,
        RouterTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router'
        }),
        EffectsModule.forRoot([RoutingEffects])
      ],
      providers: [ LoggerService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: API_BASE_URL, useValue: '/api' }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Personal Knowledge Manager');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.toolbar').textContent).toContain('Personal Knowledge Manager');
  }));
});
