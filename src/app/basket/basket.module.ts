import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import {
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { BasketFormComponent } from './basket-form/basket-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { MoneyPipeModule } from 'src/shared/pipes/money.pipe.module';
import { CountriesApiService } from 'src/shared/services/countries-api.service';
import { COUNTRIES_API_SERVICE_TOKEN } from 'src/shared/interfaces/countries-api-service-interface';
import { CURRENCIES_API_SERVICE_TOKEN } from 'src/shared/interfaces/currencies-api-service-interface';
import {
  CURRENCIES_API_KEY_TOKEN,
  CurrenciesApiService,
} from 'src/shared/services/currencies-api.service';

@NgModule({
  declarations: [BasketComponent, BasketItemComponent, BasketFormComponent],
  exports: [BasketComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiInputCountModule,
    TuiBadgeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiInputDateModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    MoneyPipeModule,
  ],
  providers: [
    { provide: COUNTRIES_API_SERVICE_TOKEN, useClass: CountriesApiService },
    { provide: CURRENCIES_API_SERVICE_TOKEN, useClass: CurrenciesApiService },
    {
      provide: CURRENCIES_API_KEY_TOKEN,
      useValue: 'Zlkr7bKs6vWaLpSPWobyDoeohQRnGTzY',
    },
  ],
})
export class BasketModule {}
