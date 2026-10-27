import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie-service';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { Movie } from '../../../classes/movie';
import { ResponseMovieResult } from '../../../classes/response-search-movie/response-movie-result';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionStorageService } from '../../../services/session-storage-service';

@Component({
  selector: 'app-movie-recommendations',
  standalone: false,
  templateUrl: './movie-recommendations.html',
  styleUrl: './movie-recommendations.scss',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class MovieRecommendations implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sessionStorageService = inject(SessionStorageService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public id: WritableSignal<number> = signal(0);

  public movie: WritableSignal<Movie> = signal(null);
  public movieResults: WritableSignal<ResponseMovieResult[]> = signal([]);

  public movieRecommendedError: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  public movieRecommendationsTitle: WritableSignal<string> = signal('Movie Recommendations');

  public ifYouLikedText: WritableSignal<string> = signal('If you liked');
  public youWouldLikeText: WritableSignal<string> = signal(', you would like also the following movies:');

  public displayMode: WritableSignal<string> = signal('grid');

  public noRecommendedMovies: WritableSignal<string> = signal('There are no recommended movies to');

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieRecommendedSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();
  private queryParamsSubscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.setId();
    this.getMovie();
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['displayMode']) {
        this.displayMode.set(queryParams['displayMode']);
      }
    });
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
        this.setTitle();
      }
    });
  }

  private getMovie(): void {
    this.movie.set(this.sessionStorageService.getItem('movie'));
    this.setTitle();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent.params?.subscribe((params) => {
      this.id.set(parseInt(params['id']));
      this.getRecommendedMovies();
    });
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie().title, this.movie().original_title, this.movie().release_date
    );
    this.titleService.setMovieRecommendedTitle(formattedTitle);
  }

  private getRecommendedMovies(): void {
    this.movieRecommendedError.set(false);
    this.getMovieRecommendedSubscription = this.movieService.getMovieRecommendedMovies(this.id()).subscribe({
      next: (movieResults) => {
        this.movieResults.set(movieResults);
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {}
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieRecommendedError.set(true);
    this.errorMessage.set(error.message);
  }

  public reloadRecommendedMovies(event: boolean): void {
    this.getRecommendedMovies();
  }

  public changeDisplay(mode: string): void {
    this.displayMode.set(mode);
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieRecommendedSubscription) {
      this.getMovieRecommendedSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}
