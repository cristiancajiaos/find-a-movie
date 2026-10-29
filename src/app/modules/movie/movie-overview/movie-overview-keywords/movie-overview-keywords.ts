import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { MovieKeyword } from '../../../../classes/movie-keyword/movie-keyword';

@Component({
  selector: 'app-movie-overview-keywords',
  standalone: false,
  templateUrl: './movie-overview-keywords.html',
  styleUrl: './movie-overview-keywords.scss',
})
export class MovieOverviewKeywords {

  public keywordsTitle: WritableSignal<string> = signal('Keywords');

  movieKeywords: InputSignal<MovieKeyword[]> = input.required<MovieKeyword[]>();

}
