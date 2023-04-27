import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { map } from 'rxjs/operators';
import { CurrenciesApiServiceInterface } from '../interfaces/currencies-api-service-interface';

export const CURRENCIES_API_KEY_TOKEN = new InjectionToken(
  'CURRENCIES_API_KEY_TOKEN',
);

const host = 'https://api.apilayer.com/exchangerates_data/convert';

@Injectable({ providedIn: 'root' })
export class CurrenciesApiService implements CurrenciesApiServiceInterface {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(CURRENCIES_API_KEY_TOKEN)
    private readonly apiKey: string,
  ) {}

  get(from: string, to: string): Observable<number> {
    return this.httpClient
      .get(`${host}?to=${to}&from=${from}&amount=1`, {
        headers: { apikey: this.apiKey },
      })
      .pipe(
        map((response: { [key: string]: any }) => response?.info?.rate ?? 0),
      );
  }
}
