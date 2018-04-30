
import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('api.base.url');

export interface Identifiable {
  id: number;
}


