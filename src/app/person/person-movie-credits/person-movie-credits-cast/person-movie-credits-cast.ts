import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  styleUrl: './person-movie-credits-cast.scss'
})
export class PersonMovieCreditsCast implements OnInit {

  @Input() castCredits: ResponsePersonCastCredit[] = [];
  
  ngOnInit(): void {

  }

}
