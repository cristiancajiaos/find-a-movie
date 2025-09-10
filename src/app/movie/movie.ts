import { AfterContentInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Movie } from '../classes/movie';
import { MovieHeader } from './movie-header/movie-header';
import { TitleService } from '../services/title-service';
import { environment } from '../../environments/environment.development';
import { faImagePortrait, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.html',
  styleUrl: './movie.scss'
})
export class MovieComponent implements OnInit, AfterContentInit {

  public imagePortrait: IconDefinition = faImagePortrait;
  public id: number = 0;
  public movie: Movie = new Movie();

  public formattedTitle: string = '';

  public altPosterText: string = '';
  public posterSizeSmall: string = '';
  public posterSizeOriginal: string = '';

  public loadingView: boolean = true;
  public loadingMovie: boolean = false;

  public movieNotFound: boolean = false;
  public movieError: boolean = false;
  public errorMessage: string = '';

  @ViewChild('movieHeader') movieHeader!: MovieHeader;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.cd.detectChanges();
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getMovie();
  }

  ngAfterContentInit(): void {
    this.loadingView = false;
    this.cd.detectChanges();
  }

  private getMovie(): void {
    this.movieError = false;
    this.loadingMovie = true;
    this.movieService.getMovie(this.id)
    .then(movie => {
      this.movie = movie;
      this.setTitle();
      this.setMoviePoster();
    })
    .catch((error: HttpErrorResponse) => {
      this.handleError(error);
    }).finally(() => {
      this.loadingMovie = false;
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.movieError = true;
      if (error.status && error.status === 404) {
        this.movieNotFound = true;
        this.titleService.setTitle("Movie Not Found");
      } else {
        this.errorMessage = error.message;
        this.titleService.setTitle("Movie Service Error");
      }
  }

  public reloadMovie(event: boolean): void {
    this.getMovie();
  }

  private setTitle(): void {
    this.formattedTitle = this.movieService.getFormattedMovieTitle(this.movie.title, this.movie.release_date)
    this.titleService.setTitle(this.formattedTitle);
  }

  private setMoviePoster(): void {
    this.posterSizeSmall = this.movie.poster_path ? `${environment.imgUrl}${environment.posterSizeSmall}${this.movie.poster_path}` : 'img/default-images/movie_poster_notavailable_w500.png'
    this.posterSizeOriginal = `${environment.imgUrl}${environment.posterSizeOriginal}${this.movie.poster_path}`;
    this.altPosterText = `Poster from the movie ${this.formattedTitle}`;
  }

}
