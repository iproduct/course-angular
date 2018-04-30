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

import { Injectable, Type } from '@angular/core';
import { Identifiable, IdType } from '../shared/shared-types';
import { PRODUCTS } from './products-mock-data';
import { COLLECTION_TYPES } from './collection-types';
import { BackendPromiseService } from './backend-promise.service';

@Injectable()
export class BackendMockService implements BackendPromiseService {

  constructor() { }

  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    let results: T[];
    switch (COLLECTION_TYPES[type.name]) {
      case 'products': results = PRODUCTS as T[]; break;
    }
    return Promise.resolve( results);
  }

  create<T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        item.id = Date.now();
        PRODUCTS.push(item);
        break;
    }
    return Promise.resolve(item);
  }

  update<T extends Identifiable> (type: Type<T>, item: T): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        const index = PRODUCTS.findIndex(p => p.id === item.id);
        if (index < 0) {
          return Promise.reject(`Item with ${item.id} was not found.`);
        }
        PRODUCTS[index] = item;
        break;
    }
    return Promise.resolve(item);
  }

  remove<T extends Identifiable> (type: Type<T>, id: IdType): Promise<T> {
    if (!COLLECTION_TYPES[type.name]) {
      return Promise.reject(`Can not recognise the entity type ${type.name}`);
    }
    let result: T;
    switch (COLLECTION_TYPES[type.name]) {
      case 'products':
        const index = PRODUCTS.findIndex(p => p.id === id);
        if (index < 0) {
          return Promise.reject(`Item with ${id} was not found.`);
        }
        result = PRODUCTS.splice(index, 1)[0] as T;
        break;
    }
    return Promise.resolve(result);
  }

  // getCollectionName<T extends Identifiable> (type: Type<T>): string {
  //   return type.name.toLocaleLowerCase() + 's';
  // }
}
