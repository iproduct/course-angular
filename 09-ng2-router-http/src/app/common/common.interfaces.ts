
import { InjectionToken } from '@angular/core';

export interface Identifiable {
  id: number;
}

export const API_BASE_URL = new InjectionToken<string>('api.base.url');

