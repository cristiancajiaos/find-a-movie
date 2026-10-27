import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';
import { MovieService } from '../../../../services/movie-service';

@Component({
  selector: 'app-slide-trending',
  standalone: false,
  templateUrl: './slide-trending.html',
  styleUrl: './slide-trending.scss',
})
export class SlideTrending implements OnInit {

  private movieService = inject(MovieService);

  movieResult: InputSignal<ResponseMovieResult> = input.required<ResponseMovieResult>();

  public formattedTitle: WritableSignal<string> = signal('');
  public bgSlide: WritableSignal<Object> = signal('');

  ngOnInit(): void {
    this.setFormattedTitle();
    this.setBgSlide();
  }

  private setFormattedTitle(): void {
    this.formattedTitle.set(this.movieService.getFormattedMovieTitle(
      this.movieResult().title, this.movieResult().original_title, this.movieResult().release_date
    ));
  }

  private setBgSlide(): void {
    this.bgSlide.set({
      'background-image':`url(${this.movieResult().backdrop_path})`
    });
  }
}
