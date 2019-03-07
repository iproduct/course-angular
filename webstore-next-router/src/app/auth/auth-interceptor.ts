import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { tap, withLatestFrom, flatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthenticationResult } from './auth.model';
import { API_BASE_URL } from '../core/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authResult: AuthenticationResult | undefined = undefined;

  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe( authResult => this.authResult = authResult);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Requesting ${req.url}`);
    // send no token is not authenticated or login or register
    if (!this.authResult || !this.authResult.token
      || req.url === `${API_BASE_URL}/auth/login` || req.url === `${API_BASE_URL}/auth/register`) {
        return next.handle(req);
    } else {   // send token
      return  next.handle(req.clone({ headers: req.headers.set('X-Access-Token', this.authResult.token) })).pipe(
        tap(evt => {
            if (evt instanceof HttpResponse) {
                console.log('---> status:', evt.status);
                console.log('---> filter:', req.params.get('filter'));
            }
        })
      );
    }
  }

}
