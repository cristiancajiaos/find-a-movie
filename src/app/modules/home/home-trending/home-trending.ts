import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { MovieService } from '../../../services/movie-service';
import { faStar, faFilm, IconDefinition, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
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

  public movieResults: WritableSignal<ResponseMovieResult[]> = signal([]);

  public starIcon: IconDefinition = faStar;
  public filmIcon: IconDefinition = faFilm;
  public trendUpIcon: IconDefinition = faArrowTrendUp;

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
        this.movieResults.set(response);
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
      },
      complete: () => {}
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
