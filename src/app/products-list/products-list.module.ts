import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { PRODUCTS_API_SERVICE_TOKEN } from 'src/shared/interfaces/products-api-service-interface';
import { ProductsApiService } from 'src/shared/services/products-api-service';
import { ProductCardComponent } from './product-card/product-card.component';
import {
  TuiBadgeModule,
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { MoneyPipeModule } from 'src/shared/pipes/money.pipe.module';

@NgModule({
  declarations: [ProductsListComponent, ProductCardComponent],
  exports: [ProductsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiInputCountModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    MoneyPipeModule,
  ],
  providers: [
    { provide: PRODUCTS_API_SERVICE_TOKEN, useClass: ProductsApiService },
  ],
})
export class ProductsListModule {}
