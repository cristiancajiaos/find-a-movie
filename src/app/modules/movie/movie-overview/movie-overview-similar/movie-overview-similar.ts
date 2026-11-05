import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../../../classes/movie';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';

@Component({
  selector: 'app-movie-overview-similar',
  standalone: false,
  templateUrl: './movie-overview-similar.html',
  styleUrl: './movie-overview-similar.scss',
})
export class MovieOverviewSimilar {

  public movieSimilarTitle: WritableSignal<string> = signal('Similar Movies');

  public moreSimilarText: WritableSignal<string> = signal('More Similar Movies');

  public movie: InputSignal<Movie> = input.required<Movie>();

  public similarMovies: InputSignal<ResponseMovieResult[]> = input.required<ResponseMovieResult[]>();
}
