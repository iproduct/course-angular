var RepositoryImpl = (function () {
    function RepositoryImpl() {
        this.entities = [];
    }
    RepositoryImpl.prototype.findAll = function () {
        return this.entities;
    };
    RepositoryImpl.prototype.findById = function (id) {
        return this.entities.find(function (e) { return e.id === id; });
    };
    RepositoryImpl.prototype.create = function (entity) {
        entity.id = RepositoryImpl.nextId++;
        this.entities.push(entity);
        return entity;
    };
    RepositoryImpl.prototype.update = function (entity) {
        var index = this.entities.findIndex(function (e) { return e.id === entity.id; });
        if (index >= 0) {
            this.entities[index] = entity;
            return entity;
        }
        else {
            return undefined;
        }
    };
    RepositoryImpl.prototype.delete = function (id) {
        var index = this.entities.findIndex(function (e) { return e.id === id; });
        if (index >= 0) {
            return this.entities.splice(index, 1)[0];
        }
        else {
            return undefined;
        }
    };
    RepositoryImpl.nextId = 0;
    return RepositoryImpl;
}());
export { RepositoryImpl };
//# sourceMappingURL=repository.js.map