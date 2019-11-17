var RepositoryImpl = (function () {
    function RepositoryImpl() {
        this.entities = new Map();
    }
    RepositoryImpl.prototype.findAll = function () {
        return Array.from(this.entities.values());
    };
    RepositoryImpl.prototype.findById = function (id) {
        return this.entities.get(id);
    };
    RepositoryImpl.prototype.create = function (entity) {
        entity.id = ++RepositoryImpl.nextId;
        this.entities.set(entity.id, entity);
        return entity;
    };
    RepositoryImpl.prototype.update = function (entity) {
        if (this.entities.get(entity.id)) {
            return undefined;
        }
        this.entities.set(entity.id, entity);
        return entity;
    };
    RepositoryImpl.prototype.remove = function (id) {
        var result = this.entities.get(id);
        this.entities.delete(id);
        return result;
    };
    ;
    RepositoryImpl.nextId = 0;
    return RepositoryImpl;
}());
export { RepositoryImpl };
//# sourceMappingURL=repository.js.map