import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';
import { environment } from '../../../../environments/environment.development';

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

  ngOnInit(): void {
    this.setPoster();
    this.setYear();
  }

  public setPoster(): void {
      this.posterSizeSmall = this.crewRole.poster_path
        ? `${environment.imgUrl}${environment.posterSizeSmall}${this.crewRole.poster_path}`
        : 'img/default-images/movie_poster_notavailable_w500.png';
    }

    public setYear(): void {
      const releaseDate: Date = new Date(this.crewRole.release_date);
      this.releaseYear = releaseDate.getFullYear();
    }

}
