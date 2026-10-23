import { Pipe, type PipeTransform } from '@angular/core';
import { ProductionCompany } from '../classes/movie/production-company';

@Pipe({
  name: 'sortProductionCompaniesByName',
  standalone: false,
})
export class SortProductionCompaniesByNamePipe implements PipeTransform {
  transform(productionCompanies: ProductionCompany[]): ProductionCompany[] {
    productionCompanies.sort((a, b) => {
      const productionCompanyA: string = a.name;
      const productionCompanyB: string = b.name;
      return productionCompanyA.localeCompare(productionCompanyB);
    });

    return productionCompanies;
  }
}
