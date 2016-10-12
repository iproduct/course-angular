System.register(['./greeter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var greeter_1;
    var user;
    return {
        setters:[
            function (greeter_1_1) {
                greeter_1 = greeter_1_1;
            }],
        execute: function() {
            user = 'TypeScript User';
            document.body.innerHTML = greeter_1.default(user);
        }
    }
});
//# sourceMappingURL=index.js.map