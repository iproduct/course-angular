import { environment } from '../../environments/environment';


export function getBaseApiUrl() {
  return `http://${environment.host}:${environment.port}/api`;
}


export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
