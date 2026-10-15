import { Pipe, PipeTransform } from '@angular/core';
import { ProductionCountry } from '../classes/movie/production-country';

@Pipe({
  name: 'orderProductionCountriesByName',
  standalone: false
})
export class OrderProductionCountriesByNamePipe implements PipeTransform {

  transform(productionCountries: ProductionCountry[]): ProductionCountry[] {
      productionCountries.sort((a, b) => {
        const productionCountryA = a.name;
        const productionCountryB = b.name;
        return productionCountryA.localeCompare(productionCountryB);
      });

      return productionCountries;
    }

}
