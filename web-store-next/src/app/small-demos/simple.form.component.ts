/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 * 
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'simple-form',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <p *ngIf="nameCtrl.invalid">Name is invalid.</p>
      <div ngModelGroup="name" #nameCtrl="ngModelGroup">
        <input name="first" [ngModel]="name.first" minlength="2" class="form-control">
        <input name="last" [ngModel]="name.last" required class="form-control">
      </div>
      <input name="email" ngModel class="form-control"> 
      <button>Submit</button>
    </form>
    <button (click)="setValue()">Set value</button>
  `,
})
export class SimpleFormComponent {
  public name = {first: 'Nancy', last: 'Drew'};
  public onSubmit(f: NgForm) {
    console.log(f.value);  // {name: {first: 'Nancy', last: 'Drew'}, email: ''}
    console.log(f.valid);  // true
  }
  public setValue() { this.name = {first: 'Bess', last: 'Marvin'}; }
}