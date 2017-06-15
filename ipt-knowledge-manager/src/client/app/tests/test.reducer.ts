/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { TestActions } from './test.actions';
import { Test } from './test.model';
import { IdentityType } from '../common/common-types';

export interface State {
  ids: IdentityType[];
  entities: { [id: string]: Test }; // TypeScript compiler cannot dereference IdentityType alias
  selectedTestId: IdentityType | null;
  loading: boolean;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedTestId: null,
  loading: false

};

export function testsReducer(state = initialState, action: Action): State {
  switch (action.type) {

    case TestActions.LOAD_TESTS:
    case TestActions.LOAD_TEST:
    case TestActions.ADD_TEST:
    case TestActions.EDIT_TEST:
    case TestActions.DELETE_TEST: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case TestActions.LOAD_TESTS_FAILURE:
    case TestActions.LOAD_TEST_FAILURE:
    case TestActions.ADD_TEST_FAILURE:
    case TestActions.EDIT_TEST_FAILURE:
    case TestActions.DELETE_TEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
      });
    }

    case TestActions.SELECT_TEST: {
      return Object.assign({}, state, {
        selectedTestId: action.payload,
      });
    }

   case TestActions.LOAD_TESTS_SUCCESS: {
      const tests = action.payload;
      const newTests = tests.filter(test => !state.entities[test.id]);
      const newTestIds = newTests.map(Test => Test.id);
      const newTestEntities = {};
      newTests.forEach(test => { newTestEntities[test.id] = test });
      return {
        ids: [...state.ids, ...newTestIds],
        entities: Object.assign({}, state.entities, newTestEntities),
        selectedTestId: state.selectedTestId,
        loading: false
      };
    }

    case TestActions.LOAD_TEST_SUCCESS: {
      const test: Test = action.payload;
      if (state.ids.indexOf(test.id) < 0) {
         return {
           ids: [...state.ids, test.id],
           entities: Object.assign({}, state.entities, {[test.id]: test}),
           selectedTestId: state.selectedTestId,
           loading: false
         };
      } else {
         return {
           ids: state.ids,
           entities: Object.assign({}, state.entities, {[test.id]: test}),
           selectedTestId: state.selectedTestId,
           loading: false
         };
      }
    }

    case TestActions.ADD_TEST_SUCCESS:
    case TestActions.EDIT_TEST_SUCCESS: {
      const test: Test = action.payload;
      if (state.ids.indexOf(test.id) < 0) {
         return {
           ids: [...state.ids, test.id],
           entities: Object.assign({}, state.entities, {[test.id]: test}),
           selectedTestId: test.id,
           loading: false
         };
      } else {
         return {
           ids: state.ids,
           entities: Object.assign({}, state.entities, {[test.id]: test}),
           selectedTestId: test.id,
           loading: false
         };
      }
    }

    case TestActions.DELETE_TEST_SUCCESS: {
      const test: Test = action.payload;
      const newTestIds = state.ids.filter(id => id !== test.id);
      const newTestEntities = {};
      newTestIds.forEach(id => { newTestEntities[id] = state.entities[id] });
      return {
        ids: newTestIds,
        entities: newTestEntities,
        selectedTestId: null,
        loading: false
      };
    }


    default: {
      return state;
    }
  }
}



/**
 * Its optimal to keep selectors and reducers together, because they construct / destruct
 * the same state data sttructure. Keep your selectors small and focused to be easily
 * combined and composed for particular use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedTestId;

export const getLoading = (state: State) => state.loading;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
