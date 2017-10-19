import { environment } from '../../environments/environment';
import { User } from '../users/user.model';


export function getBaseApiUrl() {
  return `http://${environment.host}:${environment.port}/api`;
}


export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;

export const ENTITY_TYPES = [User];
