System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Crisis, CRISES, crisesPromise, CrisisService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Crisis = (function () {
                function Crisis(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return Crisis;
            }());
            exports_1("Crisis", Crisis);
            CRISES = [
                new Crisis(1, 'Dragon Burning Cities'),
                new Crisis(2, 'Sky Rains Great White Sharks'),
                new Crisis(3, 'Giant Asteroid Heading For Earth'),
                new Crisis(4, 'Procrastinators Meeting Delayed Again'),
            ];
            crisesPromise = Promise.resolve(CRISES);
            CrisisService = (function () {
                function CrisisService() {
                }
                CrisisService.prototype.getCrises = function () { return crisesPromise; };
                CrisisService.prototype.getCrisis = function (id) {
                    return new Promise(function (resolve, reject) {
                        crisesPromise
                            .then(function (crises) {
                            setTimeout(function () { resolve(crises.find(function (crisis) { return crisis.id === +id; })); }, 2000);
                        });
                    });
                };
                CrisisService.prototype.addCrisis = function (name) {
                    name = name.trim();
                    if (name) {
                        var crisis_1 = new Crisis(CrisisService.nextCrisisId++, name);
                        crisesPromise.then(function (crises) { return crises.push(crisis_1); });
                    }
                };
                CrisisService.nextCrisisId = 100;
                CrisisService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CrisisService);
                return CrisisService;
            }());
            exports_1("CrisisService", CrisisService);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis.service.js.map