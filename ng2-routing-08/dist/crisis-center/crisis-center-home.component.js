System.register(['rxjs/Rx', '@angular/core'], function(exports_1, context_1) {
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
    var Rx_1, core_1;
    var CrisisCenterHomeComponent;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CrisisCenterHomeComponent = (function () {
                function CrisisCenterHomeComponent() {
                    this.result = '';
                    this.subjectResult = '';
                }
                CrisisCenterHomeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.numbersObservable = Rx_1.Observable.interval(200)
                        .map(function (n) { return n * n; })
                        .filter(function (n) { return n % 3 === 0; })
                        .take(10)
                        .scan(function (acc, val) { return acc + ' - ' + val; });
                    this.numbersSubscription = this.numbersObservable
                        .subscribe(function (s) { return _this.result = s; }, function (err) { return _this.result += ': error:' + err; }, function () { return _this.result += ': completed'; });
                    var source = Rx_1.Observable.interval(1000);
                    var subject = new Rx_1.BehaviorSubject(0);
                    var refCounted = source.multicast(subject).refCount();
                    var subscription1;
                    var subscription2;
                    // This calls `connect()`, because
                    // it is the first subscriber to `refCounted`
                    this.subjectResult += 'observerA subscribed; ';
                    subscription1 = refCounted.subscribe({
                        next: function (v) { return _this.subjectResult += 'observerA: ' + v + '; '; }
                    });
                    setTimeout(function () {
                        _this.subjectResult += 'observerB subscribed; ';
                        subscription2 = refCounted.subscribe({
                            next: function (v) { return _this.subjectResult += 'observerB: ' + v + '; '; }
                        });
                    }, 2200);
                    setTimeout(function () {
                        _this.subjectResult += 'observerA unsubscribed; ';
                        subscription1.unsubscribe();
                    }, 3400);
                    // This is when the shared Observable execution will stop, because
                    // `refCounted` would have no more subscribers after this
                    setTimeout(function () {
                        _this.subjectResult += 'observerB unsubscribed; ';
                        subscription2.unsubscribe();
                    }, 4000);
                };
                CrisisCenterHomeComponent.prototype.ngOnDestroy = function () {
                    this.numbersSubscription.unsubscribe();
                };
                CrisisCenterHomeComponent = __decorate([
                    core_1.Component({
                        template: "\n    <p>Welcome to the Crisis Center</p>\n    <p>Observable numbers: {{result}}</p>\n    <p>Subject demo: {{subjectResult}}</p>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], CrisisCenterHomeComponent);
                return CrisisCenterHomeComponent;
            }());
            exports_1("CrisisCenterHomeComponent", CrisisCenterHomeComponent);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-center-home.component.js.map