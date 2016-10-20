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
var hero_1 = require('./hero');
var SubmittedComponent = (function () {
    function SubmittedComponent() {
        this.submitted = false;
        this.submittedChange = new core_1.EventEmitter();
    }
    SubmittedComponent.prototype.onClick = function () { this.submittedChange.emit(false); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hero_1.Hero)
    ], SubmittedComponent.prototype, "hero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SubmittedComponent.prototype, "submitted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SubmittedComponent.prototype, "submittedChange", void 0);
    SubmittedComponent = __decorate([
        core_1.Component({
            selector: 'hero-submitted',
            template: "\n  <div *ngIf=\"submitted\">\n    <h2>You submitted the following:</h2>\n    <div class=\"row\">\n      <div class=\"col-xs-3\">Name</div>\n      <div class=\"col-xs-9  pull-left\">{{ hero.name }}</div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-3\">Alter Ego</div>\n      <div class=\"col-xs-9 pull-left\">{{ hero.alterEgo }}</div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-3\">Power</div>\n      <div class=\"col-xs-9 pull-left\">{{ hero.power }}</div>\n    </div>\n    <br>\n    <button class=\"btn btn-default\" (click)=\"onClick()\">Edit</button>\n  </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], SubmittedComponent);
    return SubmittedComponent;
}());
exports.SubmittedComponent = SubmittedComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=submitted.component.js.map