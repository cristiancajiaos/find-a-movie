import { Pipe, type PipeTransform } from '@angular/core';
import { ResponsePersonResult } from '../classes/response-search-person/response-person-result';

@Pipe({
  name: 'limitSearchPersonResults',
  standalone: false
})
export class LimitSearchPersonResultsPipe implements PipeTransform {
  transform(personResults: ResponsePersonResult[], limit: number): ResponsePersonResult[] {
    return personResults.slice(0, limit);
  }
}
