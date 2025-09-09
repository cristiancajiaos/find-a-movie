import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Movie } from '../classes/movie';
import { MovieHeader } from './movie-header/movie-header';

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
    })
    .catch(error => {
      console.log(error);
    }).finally(() => {
      this.loadingMovie = false;
    });
  }

}
