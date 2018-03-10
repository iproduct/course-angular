import { Identifiable } from '../shared/common-types';
import { Product } from '../products/product.model';
import { Type } from '@angular/core';

export const COLLECTION_TYPES: Array<Type<Identifiable>> = [Product];
