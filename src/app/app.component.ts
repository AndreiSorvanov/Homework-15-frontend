import { Component } from '@angular/core';
import { BasketService } from 'src/shared/services/basket.service';
import {
  Page,
  SwitchPageService,
} from 'src/shared/services/switch-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  readonly page$ = this.switchPageService.currentPage$;

  constructor(
    private readonly switchPageService: SwitchPageService,
    public readonly basketService: BasketService,
  ) {
    this.basketService.initialize();
  }
}
