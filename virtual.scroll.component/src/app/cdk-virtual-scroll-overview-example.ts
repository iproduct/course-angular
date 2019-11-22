import {ChangeDetectionStrategy, Component} from '@angular/core';

/** @title Basic virtual scroll */
@Component({
  selector: 'cdk-virtual-scroll-overview-example',
  styleUrls: ['cdk-virtual-scroll-overview-example.css'],
  templateUrl: 'cdk-virtual-scroll-overview-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkVirtualScrollOverviewExample {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */