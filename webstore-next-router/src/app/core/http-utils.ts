export interface ServiceResponse<T> {
  data: T;
}

export function getCollectionPath(collectionName): string {
  switch (collectionName) {
    case 'Product': return 'products';
    case 'User': return 'users';
  }
}
