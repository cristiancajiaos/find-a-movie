import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from './../../../services/movie-service';
import { Subscription } from 'rxjs';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { ResponseNowplayingMovie } from '../../../classes/response-nowplaying-movie';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-now-playing',
  standalone: false,
  templateUrl: './home-now-playing.html',
  styleUrl: './home-now-playing.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class HomeNowPlaying implements OnInit, OnDestroy {

  private movieService = inject(MovieService);

  public bgImage: string = 'img/bg/bg_generic_1.jpg';

  public starIcon: IconDefinition = faStar;

  public getNowPlayingMoviesSubscription = new Subscription();

  public movieResults: ResponseMovieResult[] = [];

  ngOnInit(): void {
    this.getNowPlayingMovies();
  }

  private getNowPlayingMovies(): void {
    this.getNowPlayingMoviesSubscription = this.movieService.getNowPlayingMovies().subscribe({
      next: (responseNowPlayingMovie) => {
        this.setNowPlayingMovies(responseNowPlayingMovie);
      },
      error: (error) => {
        console.error('Error fetching upcoming movies:', error);
      },
      complete: () => {}
    });
  }

  private setNowPlayingMovies(responseNowplayingMovie: ResponseNowplayingMovie): void {
    this.movieResults = responseNowplayingMovie.results.slice(0,10).map((movieResult) => {
      movieResult.backdrop_path = `${environment.imgUrl}${environment.backdropSize}${movieResult.backdrop_path}`;
      return movieResult;
    });
  }

  ngOnDestroy(): void {
    this.getNowPlayingMoviesSubscription.unsubscribe();
  }

}
