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
var forbidden_name_directive_1 = require('../shared/forbidden-name.directive');
var HeroFormReactiveComponent = (function () {
    function HeroFormReactiveComponent(fb) {
        this.fb = fb;
        this.powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
        this.hero = new hero_1.Hero(18, 'Dr. WhatIsHisName', this.powers[0], 'Dr. What');
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
                'forbiddenName': 'Someone named "Bob" cannot be a hero.',
                'usernameTaken': 'Username is alrady taken.'
            },
            'power': {
                'required': 'Power is required.'
            }
        };
    }
    HeroFormReactiveComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.hero = this.heroForm.value;
    };
    HeroFormReactiveComponent.prototype.addHero = function () {
        var _this = this;
        this.hero = new hero_1.Hero(42, '', '');
        this.buildForm();
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    HeroFormReactiveComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    HeroFormReactiveComponent.prototype.buildForm = function () {
        var _this = this;
        this.heroForm = this.fb.group({
            'name': [this.hero.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24),
                    forbidden_name_directive_1.forbiddenNameValidator(/bob/i)
                ], [forbidden_name_directive_1.usernameTakenValidator()]
            ],
            'alterEgo': [this.hero.alterEgo],
            'power': [this.hero.power, forms_1.Validators.required]
        });
        this.heroForm.statusChanges
            .subscribe(function (data) { return _this.onStatusChanged(data); });
        this.onStatusChanged(); // (re)set validation messages now
    };
    // ngDoCheck() {
    //   this.onStatusChanged();
    // }
    HeroFormReactiveComponent.prototype.onStatusChanged = function (data) {
        if (!this.heroForm) {
            return;
        }
        var form = this.heroForm;
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
    HeroFormReactiveComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero-form-reactive3',
            templateUrl: 'hero-form-reactive.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], HeroFormReactiveComponent);
    return HeroFormReactiveComponent;
}());
exports.HeroFormReactiveComponent = HeroFormReactiveComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-form-reactive.component.js.map