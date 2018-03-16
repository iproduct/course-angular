import { Identifiable } from '../shared/common-types';
import { Product } from '../products/product.model';
import { Type } from '@angular/core';
import { User } from '../users/user.model';

export const COLLECTION_TYPES: Array<Type<Identifiable>> = [Product, User];
