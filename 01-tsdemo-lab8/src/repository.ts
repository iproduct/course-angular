import { IdType, Identifiable } from './shared-types';
export interface Repository<T extends Identifiable> {
    // findAll(): T[];
    findAll: () => T[];
    findById(id: IdType): T | undefined;
    create(entity: T): T;
    update: (entity: T) => T;
    delete(id: IdType): T | undefined;
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    static nextId = 0;
    protected entities: Array<T> = [];
    findAll() {
        return this.entities;
    }   
    findById(id: IdType): T | undefined {
        return this.entities.find(e => e.id === id);
    }
    create(entity: T): T {
        entity.id = ++RepositoryImpl.nextId;
        this.entities.push(entity);
        return entity;
    }
    update(entity: T): T {
        const index = this.entities.findIndex(e => e.id === entity.id);
        if(index >= 0) {
            this.entities[index] = entity;
            return entity;
        } else {
            throw new Error(`Entity with ID=${entity.id} not found.`);
        }
    }
    delete(id: IdType): T | undefined {
        const index = this.entities.findIndex(e => e.id === id);
        if(index >= 0) {
            return this.entities.splice(index, 1)[0];
        } else {
            throw new Error(`Entity with ID=${id} not found.`);
        }
    }
}