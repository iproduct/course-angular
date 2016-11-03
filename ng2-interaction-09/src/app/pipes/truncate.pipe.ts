import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'truncate'})
export class TruncatePipe implements PipeTransform{
  transform(value: string, limit: any, trail: string): string {
    let lim  = Number.isInteger(limit) ? limit : parseInt(limit, 10);
    trail = trail || '...';
    // console.log(limit, lim, trail);
    return value.length > lim ? value.substring(0, lim) + trail : value;
  }
}
