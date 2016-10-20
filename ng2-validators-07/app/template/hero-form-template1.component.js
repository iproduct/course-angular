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
/* tslint:disable: member-ordering */
var core_1 = require('@angular/core');
var hero_1 = require('../shared/hero');
var HeroFormTemplate1Component = (function () {
    function HeroFormTemplate1Component() {
        this.powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
        this.hero = new hero_1.Hero(18, 'Dr. WhatIsHisWayTooLongName', this.powers[0], 'Dr. What');
        this.submitted = false;
        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        this.active = true;
    }
    HeroFormTemplate1Component.prototype.onSubmit = function () {
        this.submitted = true;
    };
    HeroFormTemplate1Component.prototype.addHero = function () {
        this.hero = new hero_1.Hero(42, '', '');
        this.currentForm.reset();
        // this.active = false;
        // setTimeout(() => this.active = true, 0);
    };
    __decorate([
        core_1.ViewChild('heroForm'), 
        __metadata('design:type', Object)
    ], HeroFormTemplate1Component.prototype, "currentForm", void 0);
    HeroFormTemplate1Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero-form-template1',
            templateUrl: 'hero-form-template1.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormTemplate1Component);
    return HeroFormTemplate1Component;
}());
exports.HeroFormTemplate1Component = HeroFormTemplate1Component;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-form-template1.component.js.map