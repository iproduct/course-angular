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
    var Hero, HEROES, heroesPromise, HeroService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Hero = (function () {
                function Hero(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return Hero;
            }());
            exports_1("Hero", Hero);
            HEROES = [
                new Hero(11, 'Mr. Nice'),
                new Hero(12, 'Narco'),
                new Hero(13, 'Bombasto'),
                new Hero(14, 'Celeritas'),
                new Hero(15, 'Magneta'),
                new Hero(16, 'RubberMan')
            ];
            heroesPromise = Promise.resolve(HEROES);
            HeroService = (function () {
                function HeroService() {
                }
                HeroService.prototype.getHeroes = function () { return heroesPromise; };
                HeroService.prototype.getHero = function (id) {
                    return heroesPromise
                        .then(function (heroes) { return heroes.find(function (hero) { return hero.id === +id; }); });
                };
                HeroService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HeroService);
                return HeroService;
            }());
            exports_1("HeroService", HeroService);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero.service.js.map