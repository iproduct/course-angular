/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Test } from './test.model';
import { IdentityType, ApplicationError } from '../shared/shared-types';

@Injectable()
export class TestActions {

  // Load all tests
  static LOAD_TESTS = '[Test] Load Tests';
  loadTests(): Action {
    return {
      type: TestActions.LOAD_TESTS
    };
  }

  static LOAD_TESTS_SUCCESS = '[Test] Load Tests Success';
  loadTestsSuccess(tests: Test[]): Action {
    return {
      type: TestActions.LOAD_TESTS_SUCCESS,
      payload: tests
    };
  }

  static LOAD_TESTS_FAILURE = '[Test] Load Tests Failure';
  loadTestsFailure(error: ApplicationError<Test>): Action {
    return {
      type: TestActions.LOAD_TESTS_FAILURE,
      payload: error
    };
  }

  // Load individual test
  static LOAD_TEST = '[Test] Load Test';
  loadTest(testId: IdentityType): Action {
    return {
      type: TestActions.LOAD_TEST,
      payload: testId
    };
  }

  static LOAD_TEST_SUCCESS = '[Test] Load Test Success';
  loadTestSuccess(test: Test): Action {
    return {
      type: TestActions.LOAD_TEST_SUCCESS,
      payload: test
    };
  }

  static LOAD_TEST_FAILURE = '[Test] Load Test Failure';
  loadTestFailure(error: ApplicationError<Test>): Action {
    return {
      type: TestActions.LOAD_TEST_FAILURE,
      payload: error
    };
  }

  // Select test
  static SELECT_TEST = '[Test] Select Test';
  selectTest(testId: IdentityType): Action {
    return {
      type: TestActions.SELECT_TEST,
      payload: testId
    };
  }

  // Add new test
  static ADD_TEST = '[Test] Add Test';
  addTest(test: Test): Action {
    return {
      type: TestActions.ADD_TEST,
      payload: test
    };
  }

  static ADD_TEST_SUCCESS = '[Test] Add Test Success';
  addTestSuccess(test: Test): Action {
    return {
      type: TestActions.ADD_TEST_SUCCESS,
      payload: test
    };
  }

  static ADD_TEST_FAILURE = '[Test]  Add Test Failure';
  addTestFailure(error: ApplicationError<Test>): Action {
    return {
      type: TestActions.ADD_TEST_FAILURE,
      payload: error
    };
  }

  // Edit existing test
  static EDIT_TEST = '[Test] Edit Test';
  editTest(test: Test): Action {
    return {
      type: TestActions.EDIT_TEST,
      payload: test
    };
  }

  static EDIT_TEST_SUCCESS = '[Test] Edit Test Success';
  editTestSuccess(test: Test): Action {
    return {
      type: TestActions.EDIT_TEST_SUCCESS,
      payload: test
    };
  }

  static EDIT_TEST_FAILURE = '[Test] Edit Test Failure';
  editTestFailure(error: ApplicationError<Test>): Action {
    return {
      type: TestActions.EDIT_TEST_FAILURE,
      payload: error
    };
  }

  // Delete test by id
  static DELETE_TEST = '[Test] Delete Test';
  deleteTest(testId: IdentityType): Action {
    return {
      type: TestActions.DELETE_TEST,
      payload: testId
    };
  }

  static DELETE_TEST_SUCCESS = '[Test] Delete Test Success';
  deleteTestSuccess(deletedTest: Test): Action {
    return {
      type: TestActions.DELETE_TEST_SUCCESS,
      payload: deletedTest
    };
  }

  static DELETE_TEST_FAILURE = '[Test] Delete Test Failure';
  deleteTestFailure(error: ApplicationError<Test>): Action {
    return {
      type: TestActions.DELETE_TEST_FAILURE,
      payload: error
    };
  }

}
