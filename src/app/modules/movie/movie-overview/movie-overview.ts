import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { Movie } from '../../../classes/movie';
import { Credits } from '../../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview.scss',
})
export class MovieOverview implements OnInit, OnDestroy {
  public id: number = 0;

  public movie: Movie = null;
  public credits: Credits = new Credits();
  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

  public movieTagline: string = null;
  public movieOverview: string = null;

  private error: HttpErrorResponse = null;
  public errorFound: boolean = false;
  public errorMessage: string = '';

  public movieFound: boolean = false;
  public movieErrorFound: boolean = false;

  public movieCreditsFound: boolean = true;
  public movieCreditsErrorFound: boolean = false;
  public movieCreditsErrorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieAndCreditsSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.setId();
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getMovieAndCredits();
      },
    );

    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.movie) {
        this.setTitle();
      }
    });
  }

  private getMovieAndCredits() {
    this.movie = null;
    this.movieTagline = null;
    this.movieOverview = null;
    this.movieErrorFound = false;

    const getMovie: Observable<Movie> = this.movieService.getMovie(this.id);
    const getCredits: Observable<Credits> = this.movieService.getMovieCredits(this.id);

    this.getMovieAndCreditsSubscription = forkJoin([getMovie, getCredits]).subscribe({
      next: ([movie, credits]) => {
        this.movie = movie;
        this.credits = credits;
        this.movieFound = true;
        this.movieCreditsErrorFound = true;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {
        this.setDescription();
      }
    });
  }

  private setTitle(): void {
    const formattedTitle: string = this.movieService.getFormattedMovieTitle(
      this.movie.title,
      this.movie.original_title,
      this.movie.release_date,
    );
    this.titleService.setMovieOverviewTitle(formattedTitle);
  }

  private setDescription() {
    this.movieTagline = this.movie.tagline;
    this.movieOverview = this.movie.overview;
  }

  private handleError(error: HttpErrorResponse): void {
    this.error = error;
    this.errorFound = true;
    this.errorMessage = error.message;
  }

  public reloadMovieOverview(event: boolean) {
    this.getMovieAndCredits();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieAndCreditsSubscription) {
      this.getMovieAndCreditsSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
