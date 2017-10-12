import { TestBed, inject } from '@angular/core/testing';

import { TodoRepositoryService } from './todo-repository.service';

describe('TodoRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoRepositoryService]
    });
  });

  it('should be created', inject([TodoRepositoryService], (service: TodoRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
