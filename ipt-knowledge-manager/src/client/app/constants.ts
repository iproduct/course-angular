import { environment } from '../environments/environment';
import { User } from './users/user.model';
// import { Product } from './products/product.model';
import { Test } from './tests/test.model';

export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;

export function getBaseApiUrl() {
  return `http://${environment.host}:${environment.port}/api`;
}

export const ENTITY_TYPES = [User, Test];
