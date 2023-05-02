import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketСurrency } from '../interfaces/basket-currency';
import { DB_CURRENCY_TOKEN } from '../interfaces/products-api-service-interface';

@Injectable({ providedIn: 'root' })
export class BasketCurrencyService {
  basketCurrency$ = new BehaviorSubject<BasketСurrency>({
    code: this.currency,
    exchangeRate: 1,
  });

  constructor(
    @Inject(DB_CURRENCY_TOKEN)
    private readonly currency: string,
  ) {}
}
