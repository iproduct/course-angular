import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tc-sales-tax',
  templateUrl: './sales-tax.component.html',
  styles: [`
  .calculated-tax {
    font-size: 1.5em;
    font-style: italic;
  }
  `]
})
export class SalesTaxComponent implements OnInit {
  amount: number;
  calculatedTax: number;

  constructor() { }

  ngOnInit() {
  }

  calcTax(amount: number) {
    this.calculatedTax = 0.2 * amount;
  }

  onAmountChange(e: KeyboardEvent) {
     const val = (e.target as HTMLInputElement).value;
     this.amount = parseFloat(val);
     if(!isNaN(this.amount)) {
       this.calcTax(this.amount);
     }
  }

}
