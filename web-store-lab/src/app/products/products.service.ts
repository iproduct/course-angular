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

import { Injectable, Inject } from '@angular/core';
import { Product } from './product.model';
import { IdType } from '../shared/shared-types';
import { BACKEND_SERVICE } from '../core/core.module';
import { Observable } from 'rxjs/Observable';
import { BackendService } from '../core/backend.service';

@Injectable()
export class ProductsService {

  constructor(@Inject(BACKEND_SERVICE) private backend: BackendService) { }

  findAll(): Observable<Product[]> {
    return this.backend.findAll<Product>(Product);
  }

  find(id: IdType): Observable<Product> {
    return this.backend.find<Product>(Product, id);
  }

  create(product: Product): Observable<Product> {
    return this.backend.create<Product>(Product, product);
  }

  update(product: Product): Observable<Product> {
    return this.backend.update<Product>(Product, product);
  }

  remove(id: IdType): Observable<Product> {
    return this.backend.remove<Product>(Product, id);
  }

}
