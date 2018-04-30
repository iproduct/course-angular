import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
@Component({
    selector: 'version-child',
    template: `
    <h3>Version {{major}}.{{minor}}</h3>
    <h4>Change log:</h4>
    <ul>
      <li *ngFor="let change of changeLog">{{change}}</li>
    </ul>
  `
})
export class VersionChildComponent implements OnChanges {
    @Input() public major: number;
    @Input() public minor: number;
    public changeLog: string[] = [];
    public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        const log: string[] = [];
        // tslint:disable-next-line:forin
        for (const propName in changes) {
            const changedProp = changes[propName];
            const from = JSON.stringify(changedProp.previousValue);
            const to = JSON.stringify(changedProp.currentValue);
            log.push(`${propName} changed from ${from} to ${to}`);
        }
        this.changeLog.push(log.join(', '));
    }
}
