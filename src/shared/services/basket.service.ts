import { Product } from '../interfaces/product';
import { Inject, Injectable } from '@angular/core';
import { DB_CURRENCY_TOKEN } from '../interfaces/products-api-service-interface';
import { Money } from 'ts-money';
import { Purchase } from '../interfaces/purchase';
import { BasketCurrencyService, BasketСurrency } from './currencies.service';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private _localStorageKey: string = 'basket';
  private _purchases: Purchase[] = [];
  private _summary: Money;
  private _basketCurrency: BasketСurrency;

  constructor(
    @Inject(DB_CURRENCY_TOKEN)
    private readonly currency: string,
    private readonly basketCurrencyService: BasketCurrencyService,
  ) {
    this._summary = new Money(0, currency);
    this._basketCurrency = {
      code: currency,
      exchangeRate: 1,
    };

    this.basketCurrencyService.basketCurrency$.subscribe(
      (backetCurrency: BasketСurrency) => {
        this._basketCurrency = backetCurrency;
        this.updateSummary();
      },
    );
  }

  private _save() {
    localStorage.setItem(
      this._localStorageKey,
      JSON.stringify(this._purchases),
    );
  }

  get purchases(): Purchase[] {
    return this._purchases;
  }

  get summary(): Money {
    return this._summary;
  }

  initialize(): void {
    if (this._localStorageKey in localStorage) {
      this._purchases = JSON.parse(
        localStorage.getItem(this._localStorageKey)!,
        (key: string, value: any) =>
          key === 'price' ? new Money(value.amount, value.currency) : value,
      );

      this.updateSummary();
    }
  }

  addPurchase(product: Product, count: number) {
    const foundPurchase = this._purchases.filter(
      (purchase: Purchase) => purchase.product.id === product.id,
    )[0];
    if (foundPurchase) {
      foundPurchase.count = count;
    } else {
      this._purchases.push({ product, count });
    }
    this.updateSummary();
    this._save();
  }

  updatePurchase(purchase: Purchase) {
    const foundPurchase = this._purchases.filter(
      (p: Purchase) => p.product.id === purchase.product.id,
    )[0];
    foundPurchase.count = purchase.count;
    this.updateSummary();
    this._save();
  }

  deletePurchase(purchase: Purchase) {
    this._purchases = this._purchases.filter(
      (curPurchase: Purchase) => curPurchase.product.id !== purchase.product.id,
    );
    this.updateSummary();
    this._save();
  }

  private updateSummary() {
    const total: Money = this._purchases.reduce(
      (total, purchase) =>
        total.add(purchase.product.price.multiply(purchase.count)),
      new Money(0, this.currency),
    );

    try {
      this._summary = new Money(
        total.multiply(this._basketCurrency.exchangeRate).amount,
        this._basketCurrency.code,
      );
    } catch (error) {
      console.error(`Валюта ${this._basketCurrency.code} не поддерживатеся.`);
    }
  }
}
