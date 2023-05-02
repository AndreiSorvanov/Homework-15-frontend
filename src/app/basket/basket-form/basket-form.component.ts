import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable, Subject, of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { CountriesService } from 'src/shared/services/countries.service';
import { Country } from 'src/shared/interfaces/countries-api-service-interface';
import { CurrenciesService } from 'src/shared/services/currencies.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { BasketCurrencyService } from 'src/shared/services/basket-currency.service';

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
    TuiDestroyService,
  ],
})
export class BasketFormComponent implements OnInit {
  readonly countriesItems$ = this.countriesService.countries$.pipe(
    map((countries: Country[]) =>
      countries.map((country: Country) => new CountrySelectItem(country)),
    ),
  );

  form = new FormGroup({
    countryItem: new FormControl(
      new CountrySelectItem({ name: 'Russia', currency: 'RUB' }),
      [Validators.required],
    ),
    address: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    public readonly countriesService: CountriesService,
    private readonly basketCurrencyService: BasketCurrencyService,
    private readonly currenciesService: CurrenciesService,
    private readonly destroy$: TuiDestroyService,
  ) {}

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        switchMap(changes => {
          return this.currenciesService
            .rate$(changes.countryItem.country.currency)
            .pipe(
              map((rate: number) => ({
                code: changes.countryItem.country.currency,
                exchangeRate: rate,
              })),
            );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(exchangeInfo =>
        this.basketCurrencyService.basketCurrency$.next(exchangeInfo),
      );
  }

  submit() {}
}
