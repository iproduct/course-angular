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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var shared_module_1 = require('../shared/shared.module');
var hero_form_reactive_component_1 = require('./hero-form-reactive.component');
var HeroFormReactiveModule = (function () {
    function HeroFormReactiveModule() {
    }
    HeroFormReactiveModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, forms_1.ReactiveFormsModule],
            declarations: [hero_form_reactive_component_1.HeroFormReactiveComponent],
            exports: [hero_form_reactive_component_1.HeroFormReactiveComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormReactiveModule);
    return HeroFormReactiveModule;
}());
exports.HeroFormReactiveModule = HeroFormReactiveModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-form-reactive.module.js.map