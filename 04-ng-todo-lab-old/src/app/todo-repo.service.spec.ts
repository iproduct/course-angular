import { TestBed, inject } from '@angular/core/testing';

import { TodoRepoService } from './todo-repo.service';

describe('TodoRepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoRepoService]
    });
  });

  it('should be created', inject([TodoRepoService], (service: TodoRepoService) => {
    expect(service).toBeTruthy();
  }));
});
