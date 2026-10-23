import { Pipe, type PipeTransform } from '@angular/core';
import { ProductionCountry } from '../classes/movie/production-country';

@Pipe({
  name: 'sortProductionCountriesByName',
  standalone: false
})
export class SortProductionCountriesByNamePipe implements PipeTransform {
  transform(productionCountries: ProductionCountry[]): ProductionCountry[] {
    productionCountries.sort((a, b) => {
      const productionCountryA: string = a.name;
      const productionCountryB: string = b.name;
      return productionCountryA.localeCompare(productionCountryB);
    });

    return productionCountries;
  }
}
