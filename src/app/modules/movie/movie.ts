import { Component, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../classes/movie';
import { MovieHeader } from './movie-header/movie-header';
import { TitleService } from '../../services/title-service';
import { environment } from '../../../environments/environment.development';
import { faImagePortrait, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage-service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading-service';

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
  private localStorageService = inject(LocalStorageService);
  private loadingService = inject(LoadingService);

  public imagePortrait: IconDefinition = faImagePortrait;
  
  public id: WritableSignal<number> = signal(0);
  public movie: WritableSignal<Movie> = signal(new Movie());

  public formattedTitle: string = '';

  public altPosterText: string = '';
  public posterSizeSmall: string = '';
  public posterSizeOriginal: string = '';

  public movieFound: boolean = false;
  private movieError: HttpErrorResponse = null;
  public movieNotFound: boolean = false;
  public movieErrorFound: boolean = false;
  public errorMessage: string = '';

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
      if (this.movieFound) {
        this.setTitle();
      } else {
        if (this.movieError) {
          if (this.movieError.status && this.movieError.status === 404) {
            this.movieNotFound = true;
            this.titleService.setMovieNotFoundTitle();
          } else {
            this.errorMessage = this.movieError.message;
            this.titleService.setMovieServiceErrorTitle();
          }
        }
      }
    });
  }

  private getMovie(): void {
    this.movieFound = false;
    this.movieErrorFound = false;
    this.getMovieSubscription = this.movieService.getMovie(this.id()).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.localStorageService.setItem('movie', movie);
        this.movieFound = true;
        this.setMoviePoster();
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieErrorFound = true;
    this.movieError = error;
  }

  public reloadMovie(event: boolean): void {
    this.getMovie();
  }

  private setTitle(): void {
    this.formattedTitle = this.movieService.getFormattedMovieTitle(
      this.movie().title,
      this.movie().original_title,
      this.movie().release_date,
    );
    this.titleService.setTitle(this.formattedTitle);
  }

  private setMoviePoster(): void {
    this.posterSizeSmall = this.movie().poster_path
      ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movie().poster_path}`
      : 'img/default-images/movie_poster_notavailable_w500.jpg';
    this.posterSizeOriginal = this.movie().poster_path
      ? `${environment.imgUrl}${environment.posterSizeOriginal}${this.movie().poster_path}`
      : '';
    this.altPosterText = this.movie().poster_path
      ? `Poster from the movie ${this.formattedTitle}`
      : `Poster from the movie ${this.formattedTitle} is not available`;
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
