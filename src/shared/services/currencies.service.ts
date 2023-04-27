import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DB_CURRENCY_TOKEN } from '../interfaces/products-api-service-interface';
import { CURRENCIES_API_SERVICE_TOKEN } from '../interfaces/currencies-api-service-interface';
import { CurrenciesApiService } from './currencies-api.service';

export interface BasketСurrency {
  code: string;
  exchangeRate: number;
}

@Injectable({ providedIn: 'root' })
export class BasketCurrencyService {
  private _basketCurrency$: BehaviorSubject<BasketСurrency>;

  constructor(
    @Inject(DB_CURRENCY_TOKEN)
    private readonly currency: string,
  ) {
    this._basketCurrency$ = new BehaviorSubject<BasketСurrency>({
      code: this.currency,
      exchangeRate: 1,
    });
  }

  get basketCurrency$(): BehaviorSubject<BasketСurrency> {
    return this._basketCurrency$;
  }
}

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  constructor(
    @Inject(CURRENCIES_API_SERVICE_TOKEN)
    private readonly currenciesService: CurrenciesApiService,
    @Inject(DB_CURRENCY_TOKEN)
    private readonly currency: string,
  ) {}

  public rate(to: string): Observable<number> {
    if (this.currency === to) {
      return of(1);
    }

    return this.currenciesService.get(this.currency, to);
  }
}
