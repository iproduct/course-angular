import { Injectable } from '@angular/core';

@Injectable()
export class SalesTaxRateService {
  public getRate(rateName: string) { return 0.10; } // VAT = 10% 
}
