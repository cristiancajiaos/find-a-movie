import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { MovieService } from '../../../services/movie-service';
import { ResponseSearchMovie } from '../../../classes/response-search-movie';
import { environment } from '../../../../environments/environment';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../../services/loading-service';
import { TitleService } from '../../../services/title-service';

@Component({
  selector: 'app-home-trending',
  standalone: false,
  templateUrl: './home-trending.html',
  styleUrl: './home-trending.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class HomeTrending implements OnInit, OnDestroy {

  private movieService = inject(MovieService);
  private loadingService = inject(LoadingService);
  private titleService = inject(TitleService);

  public bgImage: string = 'img/bg/bg_generic_2.jpg';

  public movieResults: ResponseMovieResult[] = [];

  public starIcon: IconDefinition = faStar;

  private isLoadingSubscription = new Subscription();
  private getTrendingMoviesSubscription = new Subscription();

  ngOnInit(): void {
    this.getTrendingMovies();
    this.isLoadingSubscription = this.loadingService.isLoading.subscribe((bool) => {
      this.titleService.setDefaultTitle();
    });
  }

  private getTrendingMovies(): void {
    this.getTrendingMoviesSubscription = this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        this.setTrendingMovies(response);
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
      },
      complete: () => {}
    });
  }

  private setTrendingMovies(response: ResponseSearchMovie): void {
    this.movieResults = response.results.slice(0,10).map((movie) => {
      movie.backdrop_path = `${environment.imgUrl}${environment.backdropSize}${movie.backdrop_path}`;
      return movie;
    });

  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
    if (this.getTrendingMoviesSubscription) {
      this.getTrendingMoviesSubscription.unsubscribe();
    }
  }

}
