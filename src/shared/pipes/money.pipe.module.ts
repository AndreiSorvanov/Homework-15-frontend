import { NgModule } from '@angular/core';
import { MoneyPipe } from './money.pipe';

@NgModule({
  declarations: [MoneyPipe],
  exports: [MoneyPipe],
})
export class MoneyPipeModule {}
