import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable, Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CountriesService } from 'src/shared/services/countries.service';
import { Country } from 'src/shared/interfaces/countries-api-service-interface';
import {
  BasketCurrencyService,
  CurrenciesService,
} from 'src/shared/services/currencies.service';

class CountrySelectItem {
  constructor(readonly country: Country) {}

  [Symbol.toPrimitive](hint: string) {
    return this.country.name;
  }
}

@Component({
  selector: 'app-basket-form',
  templateUrl: './basket-form.component.html',
  styleUrls: ['./basket-form.component.less'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'поле обязательно для заполнения',
        email: 'некорректный email',
      },
    },
  ],
})
export class BasketFormComponent implements OnInit, OnDestroy {
  isEdit = false;

  readonly search$ = new Subject<string | null>();
  readonly destroy$ = new Subject<void>();

  readonly countriesItems$: Observable<CountrySelectItem[]>;

  form = new FormGroup({
    countryItem: new FormControl('Russia', [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    public readonly countriesService: CountriesService,
    private readonly basketCurrencyService: BasketCurrencyService,
    private readonly currenciesService: CurrenciesService,
  ) {
    this.countriesItems$ = countriesService.countries$.pipe(
      map((countries: Country[]) =>
        countries.map((country: Country) => new CountrySelectItem(country)),
      ),
    );
  }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      this.currenciesService
        .rate(changes.countryItem.country.currency)
        .subscribe((rate: number) => {
          this.basketCurrencyService.basketCurrency$.next({
            code: changes.countryItem.country.currency,
            exchangeRate: rate,
          });
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  submit() {}

  onSearchChange(search: string | null) {
    this.search$.next(search);
  }
}
