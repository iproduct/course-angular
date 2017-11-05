/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { environment } from '../../environments/environment';
import { User } from '../users/user.model';
import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('api.base.url');

export function getBaseApiUrl() {
  return `http://${environment.host}:${environment.port}/api`;
}

export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;

export const ENTITY_TYPES = [User];
