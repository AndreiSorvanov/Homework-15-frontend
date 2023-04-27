import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  public page: string = 'products';

  constructor(
    private readonly switchPageService: SwitchPageService,
    public readonly basketService: BasketService,
  ) {}

  ngOnInit(): void {
    this.switchPageService.currentPage$.subscribe((curPage: Page) => {
      this.page = curPage;
    });

    this.basketService.initialize();
  }

  ngOnDestroy(): void {
    this.switchPageService.currentPage$.unsubscribe();
  }
}
