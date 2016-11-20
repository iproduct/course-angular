System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var a;
    function resolvePromiseAfterTimeout(result, timeout) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(result); }, timeout);
        });
    }
    exports_1("resolvePromiseAfterTimeout", resolvePromiseAfterTimeout);
    return {
        setters:[],
        execute: function() {
            exports_1("a", a = 5);
        }
    }
});
//# sourceMappingURL=utilities.js.map