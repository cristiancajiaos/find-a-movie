import { Pipe, type PipeTransform } from '@angular/core';
import { ResponseMovieResult } from '../classes/response-search-movie/response-movie-result';

@Pipe({
  name: 'limitMovieRecommendations',
  standalone: false
})
export class LimitMovieRecommendationsPipe implements PipeTransform {
  transform(movieRecommendations: ResponseMovieResult[], to: number): ResponseMovieResult[] {
    return movieRecommendations.slice(0, to);
  }
}
