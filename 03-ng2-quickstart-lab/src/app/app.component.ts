import { Component } from '@angular/core';

@Component( {
    selector: 'my-app',
    template: `
        <h1>My first Angular App</h1>
        <h3>Data here: <input type="text" [(ngModel)]="data" /></h3>
        <h3> {{data}} </h3>
    `,
    styles: [`
        h3 { 
            color: green;
        }
    `]
})
export class AppComponent {
    data = 'Angular data from ViewModel.';

    constructor() {
        setTimeout(() => {
            this.data = 'Angular data from ViewModel.';
        }, 2000);
    }
    
}