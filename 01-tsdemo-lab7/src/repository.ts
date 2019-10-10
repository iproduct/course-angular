export type IdType = number;
export interface Identifiable {
    id: IdType;
}

interface EntityByIdGetter<T> {
    (id: IdType): T | undefined;
}

export interface Repository<T extends Identifiable> {
    findAll(): T[];
    findById(id: IdType): T | undefined;
    create(entity: T): T;
    update(entity: T): T | undefined;
    // remove(id: IdType): T | undefined;
    //remove: (id: IdType) => T | undefined;
    remove: EntityByIdGetter<T>;
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
    private static nextId = 0;
    protected entities = new Map<IdType, T>();
    
    findAll(): T[] {
        return Array.from<T>(this.entities.values());
    }    
    findById(id: number): T | undefined {
        return this.entities.get(id);
    }
    create(entity: T): T {
        entity.id = ++ RepositoryImpl.nextId;
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: T): T | undefined {
        if(this.entities.get(entity.id)) {
            return undefined;
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    remove(id: IdType): T | undefined {
        const result = this.entities.get(id);
        this.entities.delete(id);
        return result; 
    };

    
}