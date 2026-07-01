import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { Subscription } from 'rxjs';
import { ResponseUpcomingMovie } from '../../../classes/response-upcoming-movie';
import { MovieService } from '../../../services/movie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-upcoming',
  standalone: false,
  templateUrl: './home-upcoming.html',
  styleUrl: './home-upcoming.scss',
})
export class HomeUpcoming implements OnInit, OnDestroy {

  private movieService = inject(MovieService);

  public bgImage: string = 'img/bg/bg_generic_2.jpg';

  public calendarIcon: IconDefinition = faCalendar;

  public movieResults: ResponseMovieResult[] = [];

  public getUpcomingMoviesSubscription = new Subscription();

  ngOnInit(): void {
    this.getUpcomingMovies();
  }

  private getUpcomingMovies(): void {
    this.getUpcomingMoviesSubscription = this.movieService.getUpcomingMovies().subscribe({
      next: (responseUpcomingMovie) => {
        this.setUpcomingMovies(responseUpcomingMovie);
      },
      error: (error) => {
        console.error('Error fetching upcoming movies:', error);
      },
      complete: () => {}
    });
  }

  private setUpcomingMovies(responseUpcomingMovie: ResponseUpcomingMovie): void {
    this.movieResults = responseUpcomingMovie.results.slice(0,10).map((movieResult) => {
      movieResult.backdrop_path = `${environment.imgUrl}${environment.backdropSize}${movieResult.backdrop_path}`
      return movieResult;
    });
  }

  ngOnDestroy(): void {
    if (this.getUpcomingMoviesSubscription) {
      this.getUpcomingMoviesSubscription.unsubscribe();
    }
  }
}
