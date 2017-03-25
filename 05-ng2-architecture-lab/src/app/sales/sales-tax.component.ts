import { Component } from '@angular/core';

const VAT_RATE = 0.2;

@Component({
  selector: 'sales-tax',
  templateUrl: './sales-tax.component.html',
  styles: [`
    .calculated-tax {
      font-size: 1.5 em;
      font-style: italic;
    }
  `]
})
export class SalesTaxComponent {
  public calculatedTax: number;
  public chars: string;
  public calcTax(amount: number) {
    this.calculatedTax = amount * VAT_RATE;
  }
  public onKeyup(event: KeyboardEvent): void {
    let value = (event.target as HTMLInputElement).value;
    this.chars +=  value + ' | ';
    let result = parseFloat(value);
    if (!isNaN(result)) {
      this.calcTax(result);
    }
  }
}
