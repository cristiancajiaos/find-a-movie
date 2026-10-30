import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../classes/movie';
import { MovieHeader } from './movie-header/movie-header';
import { TitleService } from '../../services/title-service';
import { faImagePortrait, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading-service';
import { SessionStorageService } from '../../services/session-storage-service';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie.scss',
})
export class MovieComponent implements OnInit, OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private titleService = inject(TitleService);
  private sessionStorageService = inject(SessionStorageService);
  private loadingService = inject(LoadingService);

  public imagePortrait: IconDefinition = faImagePortrait;

  public id: WritableSignal<number> = signal(0);
  public movie: WritableSignal<Movie> = signal(new Movie());

  public formattedTitle: WritableSignal<string> = signal('');

  private movieError: WritableSignal<HttpErrorResponse> = signal(null);
  public movieFound: WritableSignal<boolean> = signal(false);
  public movieNotFound: WritableSignal<boolean> = signal(false);
  public movieErrorFound: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  public routeSubscription: Subscription = new Subscription();
  public getMovieSubscription: Subscription = new Subscription();
  public endLoadingSubscription: Subscription = new Subscription();

  @ViewChild('movieHeader') movieHeader!: MovieHeader;

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      this.id.set(parseInt(this.activatedRoute.snapshot.params['id']));
      this.getMovie();
    });

    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (!this.movieFound) {
        if (this.movieError) {
          if (this.movieError().status && this.movieError().status === 404) {
            this.movieNotFound.set(true);
            this.titleService.setMovieNotFoundTitle();
          } else {
            this.errorMessage.set(this.movieError().message);
            this.titleService.setMovieServiceErrorTitle();
          }
        }
      }
    });
  }

  private getMovie(): void {
    this.movieFound.set(false);
    this.movieErrorFound.set(false);
    this.getMovieSubscription = this.movieService.getMovie(this.id()).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.sessionStorageService.setItem('movie', movie);
        this.movieFound.set(true);
        this.setTitle();
      },
      error: (error) => {
        console.error(error);
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieErrorFound.set(true);
    this.movieError.set(error);
    if (error.status && error.status === 404) {
      this.movieNotFound.set(true);
    } else {
      this.errorMessage.set(error.message);
    }
  }

  public reloadMovie(event: boolean): void {
    this.getMovie();
  }

  private setTitle(): void {
    this.formattedTitle.set(this.movieService.getFormattedMovieTitle(this.movie().title, this.movie().original_title, this.movie().release_date));
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.getMovieSubscription) {
      this.getMovieSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
