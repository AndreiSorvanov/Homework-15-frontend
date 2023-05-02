import { Pipe, PipeTransform } from '@angular/core';
import { Currencies, Money } from 'ts-money';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(value: Money): string {
    return (
      value.toString().replace('.', ',') +
      ' ' +
      Currencies[value.currency].symbol_native
    );
  }
}
