import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Purchase } from '../../../shared/interfaces/purchase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BasketService } from 'src/shared/services/basket.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.less'],
})
export class BasketItemComponent implements OnInit, OnDestroy {
  @Input()
  purchase!: Purchase;

  readonly destroy$ = new Subject<void>();

  form = new FormGroup({
    count: new FormControl(null, Validators.required),
  });

  constructor(public readonly basketService: BasketService) {}

  ngOnInit() {
    this.form.get('count')?.setValue(this.purchase.count);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      this.basketService.updatePurchase({
        ...this.purchase,
        count: changes.count,
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.basketService.deletePurchase(this.purchase);
  }

  updatePurchase(purchase: Purchase) {
    this.basketService.updatePurchase(purchase);
  }
}
