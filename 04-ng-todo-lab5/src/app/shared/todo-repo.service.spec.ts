import { TestBed } from '@angular/core/testing';

import { TodoRepoService } from './todo-repo.service';

describe('TodoRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoRepoService = TestBed.get(TodoRepoService);
    expect(service).toBeTruthy();
  });
});
