import { Component, input, InputSignal } from '@angular/core';
import { Movie } from '../../../../classes/movie';

@Component({
  selector: 'app-movie-overview-synopsis',
  standalone: false,
  templateUrl: './movie-overview-synopsis.html',
  styleUrl: './movie-overview-synopsis.scss',
})
export class MovieOverviewSynopsis {

  movie: InputSignal<Movie> = input.required();
}
