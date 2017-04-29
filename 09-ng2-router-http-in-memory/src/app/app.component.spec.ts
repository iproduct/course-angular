import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BackendService } from './common/backend.service';
import { AppNavComponent } from './app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutletStubComponent, RouterLinkStubDirective } from '../testing/router-stubs';
import { SharedModule } from './common/common.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/users.module';
import {APP_BASE_HREF} from '@angular/common';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FormsModule, AppRoutingModule, SharedModule,
    HomeModule,
    ProductModule,
    UserModule],
      providers: [
        BackendService,
        {provide: APP_BASE_HREF, useValue: '/' }
      ],
      declarations: [AppComponent, AppNavComponent, RouterLinkStubDirective, RouterOutletStubComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
