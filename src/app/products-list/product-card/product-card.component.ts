import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Product } from 'src/shared/interfaces/product';
import { BasketService } from 'src/shared/services/basket.service';
import { SwitchPageService } from 'src/shared/services/switch-page.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'поле обязательно для заполнения',
      },
    },
  ],
})
export class ProductCardComponent {
  @Input()
  product!: Product;

  constructor(
    private readonly switchPageService: SwitchPageService,
    private readonly basketService: BasketService,
  ) {}

  form = new FormGroup({
    count: new FormControl(1, Validators.required),
  });

  submit() {
    const count = this.form.get('count')?.value;
    this.basketService.addPurchase(this.product, count);

    this.switchPageService.currentPage$.next('basket');
  }
}
