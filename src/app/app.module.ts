import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ProductsListModule } from './products-list/products-list.module';
import { BasketModule } from './basket/basket.module';
import { DB_CURRENCY_TOKEN } from 'src/shared/interfaces/products-api-service-interface';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    AppRoutingModule,
    HttpClientModule,

    ProductsListModule,
    BasketModule,
  ],
  providers: [
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: DB_CURRENCY_TOKEN, useValue: 'RUB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
