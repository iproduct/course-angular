import { Injectable, Type } from "@angular/core";
import {
  Identifiable,
  IdentityType,
  ApplicationError
} from "../shared/shared-types";
import { User, Role } from "../users/user.model";
import { BackendPromiseService } from "./backend-promise.service";
import { LoggerService } from "./logger.service";

const USERS: Identifiable[] = [
  new User(
    "123456789abcdef012345678",
    "john@abv.bg",
    "John",
    "Smith",
    "john",
    Role.ADMIN
  ),
  new User(
    "123456789abcdef012345679",
    "sara@abv.bg",
    "Sara",
    'Smith',
    'sara',
    Role.INSTRUCTOR
  ),
  new User(
    '123456789abcdef012345680',
    'vera@yahoo.com',
    'Veronica',
    'Simpson',
    'vera',
    Role.STUDENT
  ),
  new User(
    '123456789abcdef012345681',
    'brian@gmail.com',
    'Brian',
    'Harisson',
    'brian',
    Role.STUDENT
  )
];

@Injectable()
export class BackendMockService implements BackendPromiseService {
  private nextId = 1234568;
  constructor(private logger: LoggerService) {}

  find<T extends Identifiable>(type: Type<T>, id: IdentityType) {
    return Promise.resolve(
      this.findAll(type).then(items => items.filter(item => item.id === id))
    )[0];
  }

  findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    switch (type.name) {
      case User.name:
        return Promise.resolve(USERS as T[]);
      default:
        return Promise.reject<T[]>(
          new ApplicationError<T>(`Cannot recognize entity type: ${type.name}.`)
        );
    }
  }

  add<T extends Identifiable>(item: T): Promise<T> {
    item.id = this.getNextId();
    if (item instanceof User) {
      USERS.push(item);
      this.logger.log(`User ${item.email} added successfully.`);
      return Promise.resolve(item);
    } else {
      return Promise.reject<T>(
        new ApplicationError<T>(`Cannot recognize entity type of item with ID: ${item.id}.`)
      );
    }
  }

  edit<T extends Identifiable>(item: T): Promise<T> {
    if (item instanceof User) {
      USERS.splice(USERS.findIndex(it => it.id === item.id), 1, item);
      this.logger.log(`User ${item.email} edited successfully.`);
      return Promise.resolve(item);
    } else {
      return Promise.reject<T>(
        new ApplicationError<T>(`Cannot recognize entity type of item with ID: ${item.id}.`)
      );
    }
  }

  delete<T extends Identifiable>(item: T): Promise<T> {
    if (item instanceof User) {
      USERS.splice(USERS.findIndex(it => it.id === item.id), 1);
      return Promise.resolve(item);
    } else {
      return Promise.reject<T>(
        new ApplicationError<T>(`Cannot recognize entity type of item with ID: ${item.id}.`)
      );
    }
  }

  private getNextId(): IdentityType {
    return '123456789abcdef0' + this.nextId++;
  }
}
