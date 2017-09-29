/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { InjectionToken, Type } from '@angular/core';
import { ENTITY_TYPES } from '../constants';
import { Action } from '@ngrx/store';

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

export interface ActionWithPayload<T> extends Action {
  payload: T;
}