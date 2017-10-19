import { Injectable, Type } from '@angular/core';
import { Identifiable, IdentityType, ApplicationError } from '../shared/shared-types';
import { User, Role } from '../users/user.model';
import { BackendPromiseService } from './backend-promise.service';
import { LoggerService } from './logger.service';

const USERS: Identifiable[] = [
  new User('123456789abcdef012345678', 'john@abv.bg', 'John', 'Smith', 'john', Role.ADMIN),
  new User('123456789abcdef012345679', 'sara@abv.bg', 'Sara', 'Smith', 'sara', Role.INSTRUCTOR),
  new User('123456789abcdef012345680', 'vera@yahoo.com', 'Veronica', 'Simpson', 'vera', Role.STUDENT),
  new User('123456789abcdef012345681', 'brian@gmail.com', 'Brian', 'Harisson', 'brian', Role.STUDENT),
];


@Injectable()
export class BackendMockService implements BackendPromiseService {

  constructor(private logger: LoggerService) { }

  find <T extends Identifiable>(type: Type<T>, id: IdentityType) {
    return Promise.resolve(this.findAll(type).then(
      items => items.filter(item => item.id === id)))[0];

  }

  findAll <T extends Identifiable>(type: Type<T>): Promise<T[]> {
    switch (type.name) {
      case User.name:
        return Promise.resolve(USERS as T[]);
      default:
        return Promise.reject<T[]>(new ApplicationError<T>(`Cannot recognize entity type: ${type.name}.`));
    }
  }

  add <T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  edit <T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete <T extends Identifiable>(type: Type<T>, id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }


}
