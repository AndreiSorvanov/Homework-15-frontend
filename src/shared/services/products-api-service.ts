import { HttpClient } from '@angular/common/http';
import { ProductsApiServiceInterface } from '../interfaces/products-api-service-interface';
import { ApiProduct } from '../interfaces/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const host = 'http://localhost:3000/products';

@Injectable({ providedIn: 'root' })
export class ProductsApiService implements ProductsApiServiceInterface {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<ApiProduct[]> {
    return this.httpClient.get<ApiProduct[]>(host);
  }
}
