import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Observable, Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CountriesService } from 'src/shared/services/countries.service';
import { Country } from 'src/shared/interfaces/countries-api-service-interface';
import { Money } from 'ts-money';
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
  // readonly items$: Observable<PositionComboboxItem[] | null> =
  //   this.search$.pipe(
  //     filter(value => value !== null),
  //     switchMap(value =>
  //       this.serverRequest$(value!).pipe(
  //         debounceTime(500),
  //         catchError(() => of(null)),
  //       ),
  //     ),
  //   );
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
    // this.currenciesService.rate('RUB', 'EUR');
    // this.countriesService.initialize();

    // setTimeout(() => {
    //   console.log(this.countriesService.countries[0]);
    // }, 2000);

    // if (this.purchase) {
    //   this.form.get('title')?.setValue(this.purchase.title);
    //   this.form.get('price')?.setValue(this.purchase.price);
    //   this.form
    //     .get('date')
    //     ?.setValue(TuiDay.fromLocalNativeDate(this.purchase.date));
    //   this.form.get('comment')?.setValue(this.purchase.comment);

    //   this.isEdit = true;
    // }

    // this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
    //   const price = changes?.title?.position?.price;

    //   const input2 = this.form.get('price') as FormControl;
    //   if (price !== undefined) {
    //     input2.setValue(price, { emitEvent: false });
    //     input2.disable({ emitEvent: false });
    //   } else {
    //     input2.enable({ emitEvent: false });
    //   }
    // });

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
