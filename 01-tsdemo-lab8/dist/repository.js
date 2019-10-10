export class RepositoryImpl {
    constructor() {
        this.entities = [];
    }
    findAll() {
        return this.entities;
    }
    findById(id) {
        return this.entities.find(e => e.id === id);
    }
    create(entity) {
        entity.id = ++RepositoryImpl.nextId;
        this.entities.push(entity);
        return entity;
    }
    update(entity) {
        const index = this.entities.findIndex(e => e.id === entity.id);
        if (index >= 0) {
            this.entities[index] = entity;
            return entity;
        }
        else {
            throw new Error(`Entity with ID=${entity.id} not found.`);
        }
    }
    delete(id) {
        const index = this.entities.findIndex(e => e.id === id);
        if (index >= 0) {
            return this.entities.splice(index, 1)[0];
        }
        else {
            throw new Error(`Entity with ID=${id} not found.`);
        }
    }
}
RepositoryImpl.nextId = 0;
//# sourceMappingURL=repository.js.map