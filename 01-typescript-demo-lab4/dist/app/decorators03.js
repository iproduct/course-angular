System.register(["reflect-metadata"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var formatMetadataKey, Greeter, greeter;
    var __moduleName = context_1 && context_1.id;
    function format(formatString) {
        return Reflect.metadata(formatMetadataKey, formatString);
    }
    function getFormat(target, propertyKey) {
        return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            formatMetadataKey = Symbol("format");
            Greeter = (function () {
                function Greeter(message) {
                    this.greeting = message;
                }
                Greeter.prototype.greet = function () {
                    var formatString = getFormat(this, "greeting");
                    return formatString.replace("%s", this.greeting);
                };
                __decorate([
                    format("Hello, %s"),
                    __metadata("design:type", String)
                ], Greeter.prototype, "greeting", void 0);
                return Greeter;
            }());
            greeter = new Greeter("Test");
            greeter.greet;
        }
    };
});
//# sourceMappingURL=decorators03.js.map