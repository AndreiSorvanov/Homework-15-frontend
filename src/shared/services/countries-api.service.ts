import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  CountriesApiServiceInterface,
  Country,
} from '../interfaces/countries-api-service-interface';

const host = 'https://restcountries.com/v3.1/all?fields=name,currencies';

@Injectable({ providedIn: 'root' })
export class CountriesApiService implements CountriesApiServiceInterface {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Country[]> {
    return this.httpClient.get<{ [key: string]: any }[]>(host).pipe(
      map((countries: { [key: string]: any }) => {
        return countries
          .map((country: any) => ({
            name: country?.name?.common,
            currency:
              country?.currencies && typeof country?.currencies === 'object'
                ? Object.keys(country?.currencies)[0]
                : undefined,
          }))
          .filter(
            (country: Partial<Country>) =>
              country.name !== undefined && country.currency !== undefined,
          )
          .sort((a: Country, b: Country) => (a.name > b.name ? 1 : -1));
      }),
    );
  }
}
