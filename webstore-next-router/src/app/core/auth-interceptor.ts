import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { tap, withLatestFrom, flatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_BASE_URL = `${environment.scheme}://${environment.domain}:${environment.port}/api`;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( @Inject(API_BASE_URL) private baseUrl: string, private store: Store<AuthState>){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Requesting ${req.url}`);
    if (req.url === `${this.baseUrl}/auth/login` || req.url === `${this.baseUrl}/auth/register`) {
        return next.handle(req);
    } else {   // send token
        return this.store.select(fromAuthRoot.selectToken).pipe(
            flatMap(token =>
                next.handle(req.clone({ headers: req.headers.set('X-Access-Token', token) })).pipe(
                    tap(evt => {
                        if (evt instanceof HttpResponse) {
                            console.log('---> status:', evt.status);
                            console.log('---> filter:', req.params.get('filter'));
                        }
                    })
                )
            )
        );
    }
  }

}
