import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const CURRENCIES_API_SERVICE_TOKEN = new InjectionToken(
  'CURRENCIES_API_SERVICE_TOKEN',
);

export interface CurrenciesApiServiceInterface {
  get(from: string, to: string): Observable<number>;
}
