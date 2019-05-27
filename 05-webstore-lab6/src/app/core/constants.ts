import { environment } from 'src/environments/environment';

export const ENTITY_URLS = {
  'Product': '/api/products',
  'User': '/api/users'
};

export const API_BASE_URL = `${environment.scheme}://${environment.domain}:${environment.port}/api`;

