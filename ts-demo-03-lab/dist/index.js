System.register(['./users'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var users_1;
    var user;
    return {
        setters:[
            function (users_1_1) {
                users_1 = users_1_1;
            }],
        execute: function() {
            user = new users_1.Customer('John', 'Smith', 'john@abv.bg', 'john', {});
            document.body.innerHTML = user.getSalutation();
        }
    }
});
//# sourceMappingURL=index.js.map