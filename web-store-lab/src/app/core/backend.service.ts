/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This software provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial illustartive and evaluation purposes only.
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and may contain security flаws and weaknesses.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Identifiable, IdType } from '../shared/shared-types';
import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface BackendService  {
  findAll<T extends Identifiable> (type: Type<T>): Observable<T[]> ;
  find<T extends Identifiable> (type: Type<T>, id: IdType): Observable<T> ;
  create<T extends Identifiable> (type: Type<T>, item: T): Observable<T>;
  update<T extends Identifiable> (type: Type<T>, item: T): Observable<T>;
  remove<T extends Identifiable> (type: Type<T>, id: IdType): Observable<T>;
  // refresh<T extends Identifiable> (type: Type<T>): Observable<T[]> ;
}
