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
