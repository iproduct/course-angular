import { Identifiable, IdType } from "./shared-types";

export interface Repository<T extends Identifiable> {
  findAll(): T[];
  findById(id: IdType): T | undefined;
  create(entity: T): T;
  update(entity: T): T | undefined;
  delete(id: IdType): T | undefined;
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
  static nextId = 0;
  protected entities: T[] = [];
  findAll(): T[] {
    return this.entities;
  }
  findById(id: IdType) {
    return this.entities.find(e => e.id === id);
  }
  create(entity: T) {
    entity.id = RepositoryImpl.nextId++;
    this.entities.push(entity);
    return entity;
  }
  update(entity: T) {
    const index = this.entities.findIndex(e => e.id === entity.id);
    if (index >= 0) {
      this.entities[index] = entity;
      return entity;
    } else {
      return undefined;
    }
  }
  delete(id: IdType){
    const index = this.entities.findIndex(e => e.id === id);
    if (index >= 0) {
      return this.entities.splice(index, 1)[0];
    } else {
      return undefined;
    }
  }
}
