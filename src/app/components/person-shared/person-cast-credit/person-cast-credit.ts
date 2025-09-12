import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-person-cast-credit',
  standalone: false,
  templateUrl: './person-cast-credit.html',
  styleUrl: './person-cast-credit.scss',
})
export class PersonCastCredit implements OnInit {
  @Input() castRole: ResponsePersonCastCredit = new ResponsePersonCastCredit();

  public posterSizeSmall: string = '';
  public releaseYear: number = 0;

  ngOnInit(): void {
    this.setPoster();
    this.setYear();
  }

  public setPoster(): void {
    this.posterSizeSmall = this.castRole.poster_path
      ? `${environment.imgUrl}${environment.posterSizeSmall}${this.castRole.poster_path}`
      : 'img/default-images/movie_poster_notavailable_w500.png';
   console.log(this.posterSizeSmall);
  }

  public setYear(): void {
    const releaseDate: Date = new Date(this.castRole.release_date);
    this.releaseYear = releaseDate.getFullYear();
  }

}
