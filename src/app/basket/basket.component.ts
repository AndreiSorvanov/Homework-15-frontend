import { Component } from '@angular/core';
import { Purchase } from 'src/shared/interfaces/purchase';
import { BasketService } from 'src/shared/services/basket.service';
import { SwitchPageService } from 'src/shared/services/switch-page.service';
import { Money } from 'ts-money';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less'],
})
export class BasketComponent {
  get summary(): Money {
    return this.basketService.summary;
  }

  get purchases(): Purchase[] {
    return this.basketService.purchases;
  }

  constructor(
    private readonly switchPageService: SwitchPageService,
    private readonly basketService: BasketService,
  ) {}

  goToProducts(): void {
    this.switchPageService.currentPage$.next('products');
  }
}
