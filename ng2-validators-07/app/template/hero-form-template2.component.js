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
/* tslint:disable: member-ordering forin */
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var hero_1 = require('../shared/hero');
var HeroFormTemplate2Component = (function () {
    function HeroFormTemplate2Component() {
        this.powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
        this.hero = new hero_1.Hero(18, 'Dr. WhatIsHisWayTooLongName', this.powers[0], 'Dr. What');
        this.submitted = false;
        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        this.active = true;
        this.formErrors = {
            'name': '',
            'power': ''
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Someone named "Bob" cannot be a hero.'
            },
            'power': {
                'required': 'Power is required.'
            }
        };
    }
    HeroFormTemplate2Component.prototype.onSubmit = function () {
        this.submitted = true;
    };
    HeroFormTemplate2Component.prototype.addHero = function () {
        this.hero = new hero_1.Hero(42, '', '');
        this.currentForm.reset();
        // this.active = false;
        // setTimeout(() => this.active = true, 0);
    };
    HeroFormTemplate2Component.prototype.ngAfterViewChecked = function () {
        this.formChanged();
    };
    HeroFormTemplate2Component.prototype.formChanged = function () {
        var _this = this;
        if (this.currentForm === this.heroForm) {
            return;
        }
        this.heroForm = this.currentForm;
        if (this.heroForm) {
            this.heroForm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        }
    };
    HeroFormTemplate2Component.prototype.onValueChanged = function (data) {
        if (!this.heroForm) {
            return;
        }
        var form = this.heroForm.form;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    __decorate([
        core_1.ViewChild('heroForm'), 
        __metadata('design:type', forms_1.NgForm)
    ], HeroFormTemplate2Component.prototype, "currentForm", void 0);
    HeroFormTemplate2Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero-form-template2',
            templateUrl: 'hero-form-template2.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormTemplate2Component);
    return HeroFormTemplate2Component;
}());
exports.HeroFormTemplate2Component = HeroFormTemplate2Component;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=hero-form-template2.component.js.map