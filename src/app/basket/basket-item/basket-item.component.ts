import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Purchase } from '../../../shared/interfaces/purchase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.less'],
})
export class BasketItemComponent implements OnInit {
  @Input()
  purchase!: Purchase;

  @Output() update = new EventEmitter<Purchase>();
  @Output() delete = new EventEmitter<Purchase>();

  form = new FormGroup({
    count: new FormControl(null, Validators.required),
  });

  ngOnInit() {
    this.form.get('count')?.setValue(this.purchase.count);
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.purchase);
  }

  updatePurchase(purchase: Purchase) {
    this.update.emit({ ...purchase });
  }
}
