export type IdType = number;

export interface Identifiable {
    id: IdType;
}

type EntityByIdGetter<T extends Identifiable>  =   (id: IdType) => T | undefined;

export  interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById: EntityByIdGetter<T>;
    create(entity: T): T;
    update(entity: T): T | undefined;
    // deleteById(id: IdType): T | undefined;
    deleteById: EntityByIdGetter<T>;
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    private static nextId = 0;
    protected entities = new Map<IdType, T>();
    findAll(): T[] {
        return Array.from<T>(this.entities.values());
    }
    findById(id: IdType) {
        return this.entities.get(id);
    }
    create(entity: T): T {
        entity.id = ++RepositoryImpl.nextId;
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T | undefined {
        if (!this.findById(entity.id)) {
            return undefined;
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    deleteById(id: IdType) {
        const result =  this.entities.get(id);
        this.entities.delete(id);
        return result;
    }


}
