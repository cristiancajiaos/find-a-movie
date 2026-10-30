import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAlternateNames',
  standalone: false
})
export class SortAlternateNamesPipe implements PipeTransform {
  transform(akaNames: string[]): string[] {

    akaNames.sort((a, b) => {
      return a.localeCompare(b);
    });
    
    return akaNames;
  }
}
