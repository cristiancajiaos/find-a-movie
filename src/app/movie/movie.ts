import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service';
import { Movie } from '../classes/movie';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movie.html',
  styleUrl: './movie.scss'
})
export class MovieComponent implements OnInit, AfterViewInit {

  public id: number = 0;
  public movie: Movie = new Movie();

  public loadingView: boolean = true;
  public loadingMovie: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {

  }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getMovie();
  }

  ngAfterViewInit(): void {
    this.loadingView = false;
  }

  private getMovie(): void {
    this.loadingMovie = true;
    this.movieService.getMovie(this.id)
    .then(movie => {
      console.log(movie);
      this.movie = movie;
    })
    .catch(error => {
      console.log(error);
    }).finally(() => {
      this.loadingMovie = false;
    });
  }

}
