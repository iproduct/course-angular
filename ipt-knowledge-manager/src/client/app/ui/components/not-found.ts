import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'ipt-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>404: Not Found</mat-card-title>
      <mat-card-content>
        <p>The page does not exist yet!</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">Go Home</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      text-align: center;
    }
  `]
})
export class NotFoundComponent { }
