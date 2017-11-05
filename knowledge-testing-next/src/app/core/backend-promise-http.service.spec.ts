/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { TestBed, inject } from '@angular/core/testing';

import { BackendPromiseHttpService } from './backend-promise-http.service';

describe('BackendPromiseHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendPromiseHttpService]
    });
  });

  it('should be created', inject([BackendPromiseHttpService], (service: BackendPromiseHttpService) => {
    expect(service).toBeTruthy();
  }));
});
