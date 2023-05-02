import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DB_CURRENCY_TOKEN } from '../interfaces/products-api-service-interface';
import { CURRENCIES_API_SERVICE_TOKEN } from '../interfaces/currencies-api-service-interface';
import { CurrenciesApiService } from './currencies-api.service';

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  constructor(
    @Inject(CURRENCIES_API_SERVICE_TOKEN)
    private readonly currenciesService: CurrenciesApiService,
    @Inject(DB_CURRENCY_TOKEN)
    private readonly currency: string,
  ) {}

  public rate$(to: string): Observable<number> {
    if (this.currency === to) {
      return of(1);
    }

    return this.currenciesService.getRate(this.currency, to);
  }
}
