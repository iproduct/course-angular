System.register(['@angular/core', '@angular/router', './auth.service'], function(exports_1, context_1) {
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
    var core_1, router_1, auth_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(authService, router) {
                    this.authService = authService;
                    this.router = router;
                    this.setMessage();
                }
                LoginComponent.prototype.setMessage = function () {
                    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
                };
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    this.message = 'Trying to log in ...';
                    this.authService.login().subscribe(function () {
                        _this.setMessage();
                        if (_this.authService.isLoggedIn) {
                            // Get the redirect URL from our auth service
                            // If no redirect has been set, use the default
                            var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/admin';
                            // Set our navigation extras object
                            // that passes on our global query params and fragment
                            var navigationExtras = {
                                preserveQueryParams: true,
                                preserveFragment: true
                            };
                            // Redirect the user
                            _this.router.navigate([redirect], navigationExtras);
                        }
                    });
                };
                LoginComponent.prototype.logout = function () {
                    this.authService.logout();
                    this.setMessage();
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        template: "\n    <h2>LOGIN</h2>\n    <p>{{message}}</p>\n    <p>\n      <button (click)=\"login()\"  *ngIf=\"!authService.isLoggedIn\">Login</button>\n      <button (click)=\"logout()\" *ngIf=\"authService.isLoggedIn\">Logout</button>\n    </p>"
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=login.component.js.map