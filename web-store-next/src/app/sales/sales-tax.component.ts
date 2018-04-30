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

import { Component } from '@angular/core';

import { SalesTaxService } from './sales-tax.service';

@Component({
  selector: 'sales-tax',
  template: `
    <div class="row">
      <h2>Sales Tax Calculator</h2>
      Amount: <input #amountBox (keyup.enter)="calculateTax(amountBox.value)"
                                (blur)="calculateTax(amountBox.value)">
      <button (click)=calculateTax(amountBox.value)>Calculate Tax</button>
      <div *ngIf="amountBox.value">
      The calculateed sales tax is: 
      {{ tax | currency:'USD':true:'1.2-2' }}
      </div>
    </div>
  `
})
export class SalesTaxComponent {
  public tax: number;
  constructor(private salesTaxService: SalesTaxService) { }

  public calculateTax(value: string | number): void {
    this.tax = this.salesTaxService.getVAT(value);
  }
}
