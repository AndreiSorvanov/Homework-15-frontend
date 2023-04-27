import { Observable } from 'rxjs';
import { ApiProduct } from './product';
import { InjectionToken } from '@angular/core';

export const PRODUCTS_API_SERVICE_TOKEN = new InjectionToken(
  'PRODUCTS_API_SERVICE_TOKEN',
);

export const DB_CURRENCY_TOKEN = new InjectionToken('DB_CURRENCY_TOKEN');

export interface ProductsApiServiceInterface {
  getAll(): Observable<ApiProduct[]>;
}
