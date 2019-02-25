var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RepositoryImpl } from './repository.js';
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRepository.prototype.findUserByEmail = function (email) {
        return this.entities.find(function (e) { return e.email === email; });
    };
    return UserRepository;
}(RepositoryImpl));
export { UserRepository };
//# sourceMappingURL=user-repository.js.map