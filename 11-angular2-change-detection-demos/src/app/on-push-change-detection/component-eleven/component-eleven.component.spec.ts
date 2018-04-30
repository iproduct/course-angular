/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ComponentElevenComponent } from './component-eleven.component';

describe('Component: ComponentEleven', () => {
  it('should create an instance', () => {
    let component = new ComponentElevenComponent();
    expect(component).toBeTruthy();
  });
});
