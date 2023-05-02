import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Page = 'basket' | 'products';

@Injectable({ providedIn: 'root' })
export class SwitchPageService {
  private _currentPage$: BehaviorSubject<Page>;

  get currentPage$(): BehaviorSubject<Page> {
    return this._currentPage$;
  }

  constructor() {
    this._currentPage$ = new BehaviorSubject<Page>('basket');
  }
}
