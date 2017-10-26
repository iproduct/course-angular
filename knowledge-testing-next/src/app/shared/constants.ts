import { environment } from '../../environments/environment';
import { User } from '../users/user.model';
import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('api.base.url');

export function getBaseApiUrl() {
  return `http://${environment.host}:${environment.port}/api`;
}

export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;

export const ENTITY_TYPES = [User];
