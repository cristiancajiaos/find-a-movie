import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Movie } from '../classes/movie';
import { MovieHeader } from './movie-header/movie-header';
import { TitleService } from '../services/title-service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.html',
  styleUrl: './movie.scss'
})
export class MovieComponent implements OnInit, AfterContentInit {

  public id: number = 0;
  public movie: Movie = new Movie();

  public formattedTitle: string = '';

  public altPosterText: string = '';
  public posterSizeSmall: string = '';
  public posterSizeOriginal: string = '';

  public loadingView: boolean = true;
  public loadingMovie: boolean = false;

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
    this.loadingMovie = true;
    this.movieService.getMovie(this.id)
    .then(movie => {
      this.movie = movie;
      this.setTitle();
      this.setMoviePoster();
    })
    .catch(error => {
      console.log(error);
      this.titleService.setTitle("Movie Not Found");
    }).finally(() => {
      this.loadingMovie = false;
    });
  }

  private setTitle(): void {
    this.formattedTitle = this.movieService.getFormattedMovieTitle(this.movie.title, this.movie.release_date)
    this.titleService.setTitle(this.formattedTitle);
  }

  private setMoviePoster(): void {
    this.posterSizeSmall = `${environment.imgUrl}${environment.posterSizeSmall}${this.movie.poster_path}`;
    this.posterSizeOriginal = `${environment.imgUrl}${environment.posterSizeOriginal}${this.movie.poster_path}`;
    this.altPosterText = `Poster from the movie ${this.formattedTitle}`;
  }

}
