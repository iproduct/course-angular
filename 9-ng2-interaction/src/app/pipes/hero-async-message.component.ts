﻿import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
// Initial view: "Message: "
// After 500ms: Message: You are my Hero!"
@Component({
    selector: 'hero-message',
    template: `
    <h2>Async Hero Message and AsyncPipe</h2>
    <p>Message: {{ message$ | async }}</p>
    <button (click)="resend()">Resend</button>
    <p>Exponential strength pipe demo - Super power boost: {{2 | exponentialStrength: 10}}</p>
    `,
})
export class HeroAsyncMessageComponent {
    message$: Observable<string>;
     private messages = [
        'You are my hero!',
        'You are the best hero!',
        'Will you be my hero?'
    ];
    constructor() { this.resend(); }
    resend() {
        this.message$ = Observable.interval(1000)
            .map(i => this.messages[i])
            .take(this.messages.length);
    }
   
}