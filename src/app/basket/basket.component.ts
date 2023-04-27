import { Component } from '@angular/core';
import { Purchase } from '../../shared/interfaces/purchase';
import { BasketService } from 'src/shared/services/basket.service';
import { SwitchPageService } from 'src/shared/services/switch-page.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.less'],
})
export class BasketComponent {
  constructor(
    private readonly switchPageService: SwitchPageService,
    public readonly basketService: BasketService,
  ) {}

  goToProducts(): void {
    this.switchPageService.currentPage$.next('products');
  }

  updatePurchase(purchase: Purchase) {
    // this.purchaseService.updatePurchase(purchase);
  }

  deletePurchase(purchase: Purchase) {
    this.basketService.deletePurchase(purchase);
  }
}
