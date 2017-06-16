/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { UserActions } from './user.actions';
import { User } from './user.model';
import { IdentityType } from '../shared/shared-types';

export interface State {
  ids: IdentityType[];
  entities: { [id: string]: User }; // TypeScript compiler cannot dereference IdentityType alias
  selectedUserId: IdentityType | null;
  loading: boolean;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedUserId: null,
  loading: false
};

export function usersReducer(state = initialState, action: Action): State {
  switch (action.type) {

    case UserActions.LOAD_USERS:
    case UserActions.LOAD_USER:
    case UserActions.ADD_USER:
    case UserActions.EDIT_USER:
    case UserActions.DELETE_USER: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case UserActions.LOAD_USERS_FAILURE:
    case UserActions.LOAD_USER_FAILURE:
    case UserActions.ADD_USER_FAILURE:
    case UserActions.EDIT_USER_FAILURE:
    case UserActions.DELETE_USER_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
      });
    }

    case UserActions.SELECT_USER: {
      return Object.assign({}, state, {
        selectedUserId: action.payload,
      });
    }

   case UserActions.LOAD_USERS_SUCCESS: {
      const users = action.payload;
      const newUsers = users.filter(user => !state.entities[user.id]);
      const newUserIds = newUsers.map(User => User.id);
      const newUserEntities = {};
      newUsers.forEach(user => { newUserEntities[user.id] = user });
      return {
        ids: [...state.ids, ...newUserIds],
        entities: Object.assign({}, state.entities, newUserEntities),
        selectedUserId: state.selectedUserId,
        loading: false
      };
    }

    case UserActions.LOAD_USER_SUCCESS: {
      const user: User = action.payload;
      if (state.ids.indexOf(user.id) < 0) {
         return {
           ids: [...state.ids, user.id],
           entities: Object.assign({}, state.entities, {[user.id]: user}),
           selectedUserId: state.selectedUserId,
           loading: false
         };
      } else {
         return {
           ids: state.ids,
           entities: Object.assign({}, state.entities, {[user.id]: user}),
           selectedUserId: state.selectedUserId,
           loading: false
         };
      }
    }

    case UserActions.ADD_USER_SUCCESS:
    case UserActions.EDIT_USER_SUCCESS: {
      const user: User = action.payload;
      if (state.ids.indexOf(user.id) < 0) {
         return {
           ids: [...state.ids, user.id],
           entities: Object.assign({}, state.entities, {[user.id]: user}),
           selectedUserId: user.id,
           loading: false
         };
      } else {
         return {
           ids: state.ids,
           entities: Object.assign({}, state.entities, {[user.id]: user}),
           selectedUserId: user.id,
           loading: false
         };
      }
    }

    case UserActions.DELETE_USER_SUCCESS: {
      const user: User = action.payload;
      const newUserIds = state.ids.filter(id => id !== user.id);
      const newUserEntities = {};
      newUserIds.forEach(id => { newUserEntities[id] = state.entities[id] });
      return {
        ids: newUserIds,
        entities: newUserEntities,
        selectedUserId: null,
        loading: false
      };
    }


    default: {
      return state;
    }
  }
}

