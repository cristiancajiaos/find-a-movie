import { Component, input, InputSignal } from '@angular/core';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';

@Component({
  selector: 'app-search-movie-list',
  standalone: false,
  templateUrl: './search-movie-list.html',
  styleUrl: './search-movie-list.scss',
})
export class SearchMovieList {

  public movieResults: InputSignal<ResponseMovieResult[]> = input.required<ResponseMovieResult[]>();
  public itemsPerPage: InputSignal<number> = input.required<number>();
  public currentPage: InputSignal<number> = input.required<number>();
  public totalResults: InputSignal<number> = input.required<number>();

}
