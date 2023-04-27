import { Money } from 'ts-money';

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  currency: string;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: Money;
  count: number;
}
