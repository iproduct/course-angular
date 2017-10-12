import { Todo } from './todo.model';
import { InjectionToken } from '@angular/core';

export const INITIAL_TODOS = new InjectionToken<Array<Todo>>('Initial Todos');
