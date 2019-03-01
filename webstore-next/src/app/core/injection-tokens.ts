import { InjectionToken } from '@angular/core';
import { Identifiable } from '../shared/shared-types';

export const PRODUCTS_TOKEN = new InjectionToken<Identifiable[]>('mock_products');
