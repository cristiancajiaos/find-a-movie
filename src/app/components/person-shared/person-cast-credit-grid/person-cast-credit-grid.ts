import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { environment } from '../../../../environments/environment.development';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'app-person-cast-credit-grid',
  standalone: false,
  templateUrl: './person-cast-credit-grid.html',
  styleUrl: './person-cast-credit-grid.scss',
})
export class PersonCastCreditGrid implements OnInit {
  @Input() castRole: ResponsePersonCastCredit = new ResponsePersonCastCredit();

  public posterSizeSmall: string = '';
  public releaseYear: number = 0;
  public formattedTitle: string = '';
  public altPosterText: string = '';

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setPoster();
    this.setYear();
  }

  public setTitle(): void {
    this.formattedTitle = this.movieService.getFormattedMovieTitle(
      this.castRole.title,
      this.castRole.original_title,
      this.castRole.release_date
    );
  }

  public setPoster(): void {
    this.posterSizeSmall = this.castRole.poster_path
      ? `${environment.imgUrl}${environment.posterSizeSmall}${this.castRole.poster_path}`
      : '/img/default-images/movie_poster_notavailable_w500.png';
    this.altPosterText = this.castRole.poster_path
      ? `Poster from the movie ${this.formattedTitle}`
      : `Poster from the movie ${this.formattedTitle} is not available`;
  }

  public setYear(): void {
    const releaseDate: Date = new Date(this.castRole.release_date);
    this.releaseYear = releaseDate.getFullYear();
  }
}
