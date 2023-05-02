import { ApiProduct, Product } from '../interfaces/product';
import { Inject, Injectable } from '@angular/core';
import {
  ProductsApiServiceInterface,
  PRODUCTS_API_SERVICE_TOKEN,
  DB_CURRENCY_TOKEN,
} from '../interfaces/products-api-service-interface';
import { Money } from 'ts-money';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private _products: Product[] = [];

  get products(): Product[] {
    return this._products;
  }

  constructor(
    @Inject(PRODUCTS_API_SERVICE_TOKEN)
    private readonly productsService: ProductsApiServiceInterface,
    @Inject(DB_CURRENCY_TOKEN)
    private readonly currency: string,
  ) {}

  initialize(): void {
    this.productsService.getAll().subscribe((products: ApiProduct[]) => {
      this._products = products.map(product => ({
        id: product.id,
        title: product.title,
        price: new Money(product.price, this.currency),
        count: product.count,
      }));
    });
  }
}
