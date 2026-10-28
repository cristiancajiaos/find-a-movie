import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { MovieService } from '../../../services/movie-service';
import { faStar, faFilm, IconDefinition, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../../services/loading-service';
import { TitleService } from '../../../services/title-service';
import { HttpErrorResponse } from '@angular/common/http';

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

  public homeTrendingError: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  public trendingMoviesTitle: WritableSignal<string> = signal('Trending Movies');

  private isLoadingSubscription = new Subscription();
  private getTrendingMoviesSubscription = new Subscription();

  ngOnInit(): void {
    this.getTrendingMovies();
    this.isLoadingSubscription = this.loadingService.isLoading.subscribe((bool) => {
      this.titleService.setDefaultTitle();
    });
  }

  private getTrendingMovies(): void {
    this.homeTrendingError.set(false)
    this.getTrendingMoviesSubscription = this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        this.movieResults.set(response);
      },
      error: (error) => {
        console.error('Error fetching trending movies:', error);
        this.handleError(error);
      },
      complete: () => {}
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.homeTrendingError.set(true);
    this.errorMessage.set(error.message);
  }

  public onReload(bool: boolean): void {
    this.getTrendingMovies();
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
