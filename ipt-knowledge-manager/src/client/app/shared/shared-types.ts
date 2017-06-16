
import { InjectionToken, Type } from '@angular/core';
import { ENTITY_TYPES } from '../constants';

export const API_BASE_URL = new InjectionToken<string>('api.base.url');

export type IdentityType = string;

export interface Identifiable {
  id: IdentityType;
}

export enum ErrorType {
  FATAL_ERROR, ERROR, WARNING
}

export class ApplicationError<T> {
  constructor(
    public readonly message: string,
    public readonly forEntityId?: IdentityType,
    public readonly forEntityType?: Type<T>,
    public readonly forEntity?: T,
    public readonly type: ErrorType = ErrorType.ERROR) {}
}
