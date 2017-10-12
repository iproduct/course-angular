import { TestBed, inject } from '@angular/core/testing';

import { TodosRepositoryService } from './todos-repository.service';

describe('TodosRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosRepositoryService]
    });
  });

  it('should be created', inject([TodosRepositoryService], (service: TodosRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
