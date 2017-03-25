System.register(['@angular/core', '@angular/router', './admin.component', './admin-dashboard.component', './manage-crises.component', './manage-heroes.component', '../auth-guard.service'], function(exports_1, context_1) {
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
    var core_1, router_1, admin_component_1, admin_dashboard_component_1, manage_crises_component_1, manage_heroes_component_1, auth_guard_service_1;
    var adminRoutes, AdminRoutingModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (admin_dashboard_component_1_1) {
                admin_dashboard_component_1 = admin_dashboard_component_1_1;
            },
            function (manage_crises_component_1_1) {
                manage_crises_component_1 = manage_crises_component_1_1;
            },
            function (manage_heroes_component_1_1) {
                manage_heroes_component_1 = manage_heroes_component_1_1;
            },
            function (auth_guard_service_1_1) {
                auth_guard_service_1 = auth_guard_service_1_1;
            }],
        execute: function() {
            adminRoutes = [
                {
                    path: '',
                    component: admin_component_1.AdminComponent,
                    canActivate: [auth_guard_service_1.AuthGuard],
                    children: [
                        {
                            path: '',
                            canActivateChild: [auth_guard_service_1.AuthGuard],
                            children: [
                                { path: 'crises', component: manage_crises_component_1.ManageCrisesComponent },
                                { path: 'heroes', component: manage_heroes_component_1.ManageHeroesComponent },
                                { path: '', component: admin_dashboard_component_1.AdminDashboardComponent }
                            ]
                        }
                    ]
                }
            ];
            AdminRoutingModule = (function () {
                function AdminRoutingModule() {
                }
                AdminRoutingModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            router_1.RouterModule.forChild(adminRoutes)
                        ],
                        exports: [
                            router_1.RouterModule
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdminRoutingModule);
                return AdminRoutingModule;
            }());
            exports_1("AdminRoutingModule", AdminRoutingModule);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=admin-routing.module.js.map