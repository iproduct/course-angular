import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { CachingInterceptor } from '../core/caching-interceptor';
import { LoggingInterceptor } from '../core/logging-interceptor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'logout', component: LoginPageComponent, data: { logout: true } }]),
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [LoginFormComponent, LoginPageComponent],
  exports: [LoginPageComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule { }
