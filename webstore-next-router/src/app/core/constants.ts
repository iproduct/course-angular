import { InjectionToken } from '@angular/core';
import { Identifiable } from '../shared/shared-types';
import { environment } from 'src/environments/environment';

export const PRODUCTS_TOKEN = new InjectionToken<Identifiable[]>('mock_products');
export const API_BASE_URL = `${environment.scheme}://${environment.domain}:${environment.port}/api`;
