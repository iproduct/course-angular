System.register(['rxjs/add/operator/switchMap', '@angular/core', '@angular/router', './hero.service'], function(exports_1, context_1) {
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
    var core_1, router_1, hero_service_1;
    var HeroDetailComponent;
    return {
        setters:[
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            HeroDetailComponent = (function () {
                function HeroDetailComponent(route, router, service) {
                    this.route = route;
                    this.router = router;
                    this.service = service;
                }
                Object.defineProperty(HeroDetailComponent.prototype, "routeAnimation", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HeroDetailComponent.prototype, "display", {
                    get: function () {
                        return 'block';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HeroDetailComponent.prototype, "position", {
                    get: function () {
                        return 'absolute';
                    },
                    enumerable: true,
                    configurable: true
                });
                HeroDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params
                        .switchMap(function (params) { return _this.service.getHero(+params['id']); })
                        .subscribe(function (hero) { return _this.hero = hero; });
                };
                HeroDetailComponent.prototype.gotoHeroes = function () {
                    var heroId = this.hero ? this.hero.id : null;
                    // Pass along the hero id if available
                    // so that the HeroList component can select that hero.
                    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
                };
                __decorate([
                    core_1.HostBinding('@routeAnimation'), 
                    __metadata('design:type', Object)
                ], HeroDetailComponent.prototype, "routeAnimation", null);
                __decorate([
                    core_1.HostBinding('style.display'), 
                    __metadata('design:type', Object)
                ], HeroDetailComponent.prototype, "display", null);
                __decorate([
                    core_1.HostBinding('style.position'), 
                    __metadata('design:type', Object)
                ], HeroDetailComponent.prototype, "position", null);
                HeroDetailComponent = __decorate([
                    core_1.Component({
                        template: "\n  <h2>HEROES</h2>\n  <div *ngIf=\"hero\">\n    <h3>\"{{ hero.name }}\"</h3>\n    <div>\n      <label>Id: </label>{{ hero.id }}</div>\n    <div>\n      <label>Name: </label>\n      <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n    </div>\n    <p>\n      <button (click)=\"gotoHeroes()\">Back</button>\n    </p>\n  </div>\n  ",
                        animations: [
                            core_1.trigger('routeAnimation', [
                                core_1.state('*', core_1.style({
                                    opacity: 1,
                                    transform: 'translateX(0)'
                                })),
                                core_1.transition(':enter', [
                                    core_1.style({
                                        opacity: 0,
                                        transform: 'translateX(-100%)'
                                    }),
                                    core_1.animate('0.2s ease-in')
                                ]),
                                core_1.transition(':leave', [
                                    core_1.animate('0.5s ease-out', core_1.style({
                                        opacity: 0,
                                        transform: 'translateY(100%)'
                                    }))
                                ])
                            ])
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, hero_service_1.HeroService])
                ], HeroDetailComponent);
                return HeroDetailComponent;
            }());
            exports_1("HeroDetailComponent", HeroDetailComponent);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-detail.component.js.map