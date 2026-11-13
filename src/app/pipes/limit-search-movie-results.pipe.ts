import { Pipe, type PipeTransform } from '@angular/core';
import { ResponseMovieResult } from '../classes/response-search-movie/response-movie-result';

@Pipe({
  name: 'limitSearchMovieResults',
  standalone: false
})
export class LimitSearchMovieResultsPipe implements PipeTransform {
  transform(movieResults: ResponseMovieResult[], limit: number): ResponseMovieResult[] {
    return movieResults.slice(0, limit);
  }
}
