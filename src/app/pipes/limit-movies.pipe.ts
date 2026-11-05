import { Pipe, type PipeTransform } from '@angular/core';
import { ResponseMovieResult } from '../classes/response-search-movie/response-movie-result';

@Pipe({
  name: 'limitMovies',
  standalone: false
})
export class LimitMoviesPipe implements PipeTransform {
  transform(movies: ResponseMovieResult[], to: number): ResponseMovieResult[] {
    return movies.slice(0, to);
  }
}
