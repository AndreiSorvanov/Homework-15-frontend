import { Inject, Injectable } from '@angular/core';
import {
  COUNTRIES_API_SERVICE_TOKEN,
  Country,
} from '../interfaces/countries-api-service-interface';
import { CountriesApiService } from './countries-api.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private _localStorageKey: string = 'countries';
  private _countries$: Observable<Country[]>;

  constructor(
    @Inject(COUNTRIES_API_SERVICE_TOKEN)
    private readonly countriesService: CountriesApiService,
  ) {
    if (this._localStorageKey in localStorage) {
      this._countries$ = of(
        JSON.parse(localStorage.getItem(this._localStorageKey)!),
      );
    } else {
      this._countries$ = this.countriesService.getAll();
      this._countries$.subscribe((countries: Country[]) => {
        localStorage.setItem(this._localStorageKey, JSON.stringify(countries));
      });
    }
  }

  get countries$(): Observable<Country[]> {
    return this._countries$;
  }
}
