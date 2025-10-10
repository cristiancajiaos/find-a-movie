import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';
import { environment } from '../../../../environments/environment.development';
import { MovieService } from '../../../services/movie-service';

@Component({
  selector: 'app-person-crew-credit-list',
  standalone: false,
  templateUrl: './person-crew-credit-list.html',
  styleUrl: './person-crew-credit-list.scss'
})
export class PersonCrewCreditList implements OnInit {
  @Input() crewRole: ResponsePersonCrewCredit = new ResponsePersonCrewCredit();

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
      this.crewRole.title,
      this.crewRole.original_title,
      this.crewRole.release_date
    );
  }

  public setPoster(): void {
      this.posterSizeSmall = this.crewRole.poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.crewRole.poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.png';
      this.altPosterText = this.crewRole.poster_path
        ? `Poster from the movie ${this.formattedTitle}`
        : `Poster from the movie ${this.formattedTitle} is not available`;
    }

    public setYear(): void {
      const releaseDate: Date = new Date(this.crewRole.release_date);
      this.releaseYear = releaseDate.getFullYear();
    }

}
