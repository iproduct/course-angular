import { Injectable, Inject, forwardRef } from '@angular/core';
import { Identifiable, ResourseType, IdType } from '../shared/shared-types';
import { environment } from '../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';



export abstract class BackendService {
  abstract findAll<T extends Identifiable> (kind: ResourseType<T>): Observable<T[]>;
  abstract findById<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Observable<T>;
  abstract add<T extends Identifiable> (kind: ResourseType<T>, entity: T): Observable<T>;
  abstract update<T extends Identifiable> (kind: ResourseType<T>, entity: T): Observable<T>;
  abstract delete<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Observable<T>;
}
