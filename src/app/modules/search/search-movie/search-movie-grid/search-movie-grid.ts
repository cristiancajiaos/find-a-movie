import { Component, input, InputSignal } from '@angular/core';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';

@Component({
  selector: 'app-search-movie-grid',
  standalone: false,
  templateUrl: './search-movie-grid.html',
  styleUrl: './search-movie-grid.scss',
})
export class SearchMovieGrid {

  public movieResults: InputSignal<ResponseMovieResult[]> = input.required<ResponseMovieResult[]>();
  public itemsPerPage: InputSignal<number> = input.required<number>();
  public currentPage: InputSignal<number> = input.required<number>();
  public totalResults: InputSignal<number> = input.required<number>();

}
