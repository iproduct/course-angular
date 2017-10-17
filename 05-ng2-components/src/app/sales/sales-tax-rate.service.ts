import { Injectable } from '@angular/core';

@Injectable()
export class SalesTaxRateService {
  public getRate(rateName: string) { return 0.20; } // VAT = 10% 
}
