import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const COUNTRIES_API_SERVICE_TOKEN = new InjectionToken(
  'COUNTRIES_API_SERVICE_TOKEN',
);

export interface Country {
  name: string;
  currency: string;
}

export interface CountriesApiServiceInterface {
  getAll(): Observable<Country[]>;
}
