import { Injectable } from '@angular/core';

import { SalesTaxRateService } from './sales-tax-rate.service';
import { LoggerService } from '../core/logger.service';

@Injectable()
export class SalesTaxService {
  constructor(private rateService: SalesTaxRateService, private logger: LoggerService) { }

  public getVAT(value: string | number) {
    let amount = (typeof value === 'string') ? parseFloat(value) : value;
    let tax = (amount || 0) * this.rateService.getRate('VAT');
    this.logger.log(`Calculating tax for ${value} is: ${tax}`);
    return tax;
  }
}
