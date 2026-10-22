import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { Movie } from '../../../classes/movie';
import { Credits } from '../../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { BackdropImage } from '../../../classes/response-image/backdrop-image';
import { TitleService } from '../../../services/title-service';
import { ResponseVideoResult } from '../../../classes/response-video/response-video-result';
import { MovieExternalIds } from '../../../classes/movie-external-ids';

@Component({
  selector: 'app-movie-overview',
  standalone: false,
  templateUrl: './movie-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview.scss',
})
export class MovieOverview implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private titleService = inject(TitleService);

  public id: number = 0;

  public movie: WritableSignal<Movie> = signal(new Movie());
  public credits: WritableSignal<Credits> = signal(new Credits());
  public movieResponseVideo: WritableSignal<ResponseVideoResult> = signal(new ResponseVideoResult());
  public movieImages: WritableSignal<BackdropImage[]> = signal([]);
  public movieExternalIds: WritableSignal<MovieExternalIds> = signal(new MovieExternalIds());

  public movieTagline: string = null;
  public movieOverview: string = null;

  public errorFound: boolean = false;
  public errorMessage: string = '';

  public movieFound: boolean = false;
  public movieErrorFound: boolean = false;

  public movieCreditsFound: boolean = true;
  public movieCreditsErrorFound: boolean = false;
  public movieCreditsErrorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getMovieDetailsSubscription: Subscription = new Subscription();

  public viewFullCastText: WritableSignal<string> = signal('View Full Cast');
  public viewFeaturedCrewText: WritableSignal<string> = signal('View Featured Crew');
  public viewFullCrewText: WritableSignal<string> = signal('View Full Crew');

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
  }

  private getMovieAndCredits() {
    this.movie.set(new Movie());
    this.credits.set(new Credits());
    this.movieResponseVideo.set(new ResponseVideoResult());
    this.movieImages.set([]);
    this.movieErrorFound = false;

    const getMovie: Observable<Movie> = this.movieService.getMovie(this.id);
    const getCredits: Observable<Credits> = this.movieService.getMovieCredits(this.id);
    const getTrailer: Observable<ResponseVideoResult> = this.movieService.getMovieTrailer(this.id);
    const getImages: Observable<BackdropImage[]> = this.movieService.getMovieImages(this.id);
    const getExternalIds: Observable<MovieExternalIds> = this.movieService.getMovieExternalIds(this.id);

    this.getMovieDetailsSubscription = forkJoin([
      getMovie,
      getCredits,
      getTrailer,
      getImages,
      getExternalIds
    ]).subscribe({
      next: ([movie, credits, responseVideoResult, movieImages, movieExternalIds]) => {
        this.movie.set(movie);
        this.credits.set(credits);
        this.movieResponseVideo.set(responseVideoResult);
        this.movieImages.set(movieImages);
        this.movieExternalIds.set(movieExternalIds);
        this.movieFound = true;
        this.setTitle();
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorFound = true;
    this.errorMessage = error.message;
  }

  public reloadMovieOverview(event: boolean) {
    this.getMovieAndCredits();
  }

  private setTitle(): void {
    const formattedTitle = this.movieService.getFormattedMovieTitle(
      this.movie().title,
      this.movie().original_title,
      this.movie().release_date,
    );
    this.titleService.setTitle(formattedTitle);
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getMovieDetailsSubscription) {
      this.getMovieDetailsSubscription.unsubscribe();
    }
  }
}
