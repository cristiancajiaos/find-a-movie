import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { MovieService } from '../../../services/movie-service';
import { Movie } from '../../../classes/movie';
import { Credits } from '../../../classes/credits';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseVideo } from '../../../classes/response-video';
import { BackdropImage } from '../../../classes/response-image/backdrop-image';

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

  public id: number = 0;

  public movie: WritableSignal<Movie> = signal(new Movie());
  public credits: WritableSignal<Credits> = signal(new Credits());
  public movieResponseVideo: WritableSignal<ResponseVideo> = signal(new ResponseVideo());
  public movieImages: WritableSignal<BackdropImage[]> = signal([]);
  public movieReleaseDate: Date = new Date();
  public movieIMDB: string = '';
  public movieHomepage: string = '';

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
    this.movieResponseVideo.set(new ResponseVideo());
    this.movieImages.set([]);
    this.movieErrorFound = false;

    const getMovie: Observable<Movie> = this.movieService.getMovie(this.id);
    const getCredits: Observable<Credits> = this.movieService.getMovieCredits(this.id);
    const getTrailer: Observable<ResponseVideo> = this.movieService.getMovieVideos(this.id);
    const getImages: Observable<BackdropImage[]> = this.movieService.getMovieImages(this.id);

    this.getMovieDetailsSubscription = forkJoin([getMovie, getCredits, getTrailer, getImages]).subscribe({
      next: ([movie, credits, responseVideo, movieImages]) => {
        this.movie.set(movie);
        this.credits.set(credits);
        this.movieResponseVideo.set(responseVideo);
        this.movieImages.set(movieImages);
        this.movieFound = true;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {

      }
    });
  }

  private handleError(error: HttpErrorResponse): void {
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
    if (this.getMovieDetailsSubscription) {
      this.getMovieDetailsSubscription.unsubscribe();
    }
  }
}
