import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/shared/services/products.service';
import { Money, Currencies } from 'ts-money';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less'],
})
export class ProductsListComponent implements OnInit {
  constructor(public readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.initialize();
  }
}
