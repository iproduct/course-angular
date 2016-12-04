System.register(['@angular/core', '@angular/forms', '@angular/common', './crisis.service', './crisis-center.component', './crisis-list.component', './crisis-center-home.component', './crisis-detail.component', './crisis-center-routing.module'], function(exports_1, context_1) {
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
    var core_1, forms_1, common_1, crisis_service_1, crisis_center_component_1, crisis_list_component_1, crisis_center_home_component_1, crisis_detail_component_1, crisis_center_routing_module_1;
    var CrisisCenterModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (crisis_service_1_1) {
                crisis_service_1 = crisis_service_1_1;
            },
            function (crisis_center_component_1_1) {
                crisis_center_component_1 = crisis_center_component_1_1;
            },
            function (crisis_list_component_1_1) {
                crisis_list_component_1 = crisis_list_component_1_1;
            },
            function (crisis_center_home_component_1_1) {
                crisis_center_home_component_1 = crisis_center_home_component_1_1;
            },
            function (crisis_detail_component_1_1) {
                crisis_detail_component_1 = crisis_detail_component_1_1;
            },
            function (crisis_center_routing_module_1_1) {
                crisis_center_routing_module_1 = crisis_center_routing_module_1_1;
            }],
        execute: function() {
            CrisisCenterModule = (function () {
                function CrisisCenterModule() {
                }
                CrisisCenterModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            crisis_center_routing_module_1.CrisisCenterRoutingModule
                        ],
                        declarations: [
                            crisis_center_component_1.CrisisCenterComponent,
                            crisis_list_component_1.CrisisListComponent,
                            crisis_center_home_component_1.CrisisCenterHomeComponent,
                            crisis_detail_component_1.CrisisDetailComponent
                        ],
                        providers: [
                            crisis_service_1.CrisisService
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], CrisisCenterModule);
                return CrisisCenterModule;
            }());
            exports_1("CrisisCenterModule", CrisisCenterModule);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-center.module.js.map