import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Movie } from '../classes/movie';
import { MovieHeader } from './movie-header/movie-header';
import { TitleService } from '../services/title-service';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.html',
  styleUrl: './movie.scss'
})
export class MovieComponent implements OnInit, AfterContentInit {

  public id: number = 0;
  public movie: Movie = new Movie();

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
    })
    .catch(error => {
      console.log(error);
      this.titleService.setTitle("Movie Not Found");
    }).finally(() => {
      this.loadingMovie = false;
    });
  }

  private setTitle(): void {
    const movieTitle: string = this.movie.title;
    const movieYearDate: Date = new Date(this.movie.release_date);
    const movieYear: number = movieYearDate.getFullYear();
    const titleStr: string = `${movieTitle}` + (movieYear ? ` (${movieYear})` : '');
    this.titleService.setTitle(titleStr);
  }

}
