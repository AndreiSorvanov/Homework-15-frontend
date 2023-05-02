import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from '../../../shared/interfaces/purchase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BasketService } from 'src/shared/services/basket.service';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.less'],
  providers: [TuiDestroyService],
})
export class BasketItemComponent implements OnInit {
  @Input()
  purchase!: Purchase;

  form = new FormGroup({
    count: new FormControl(null, Validators.required),
  });

  constructor(
    public readonly basketService: BasketService,
    private readonly destroy$: TuiDestroyService,
  ) {}

  ngOnInit() {
    this.form.get('count')?.setValue(this.purchase.count);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      this.basketService.updatePurchase({
        ...this.purchase,
        count: changes.count,
      });
    });
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.basketService.deletePurchase(this.purchase);
  }

  updatePurchase(purchase: Purchase) {
    this.basketService.updatePurchase(purchase);
  }
}
