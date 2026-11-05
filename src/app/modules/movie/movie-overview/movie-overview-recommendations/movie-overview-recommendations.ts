import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';
import { Movie } from '../../../../classes/movie';

@Component({
  selector: 'app-movie-overview-recommendations',
  standalone: false,
  templateUrl: './movie-overview-recommendations.html',
  styleUrl: './movie-overview-recommendations.scss',
})
export class MovieOverviewRecommendations {

  public movieRecommendationsTitle: WritableSignal<string> = signal('Movie Recommendations');

  public moreRecommendationsText: WritableSignal<string> = signal('More Movie Recommendations');

  public movie: InputSignal<Movie> = input.required<Movie>();

  public movieRecommendations: InputSignal<ResponseMovieResult[]> = input.required<ResponseMovieResult[]>();
}
