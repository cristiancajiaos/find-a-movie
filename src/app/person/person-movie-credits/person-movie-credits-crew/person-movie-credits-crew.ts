import { Component, Input, OnInit } from '@angular/core';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';

@Component({
  selector: 'app-person-movie-credits-crew',
  standalone: false,
  templateUrl: './person-movie-credits-crew.html',
  styleUrl: './person-movie-credits-crew.scss'
})
export class PersonMovieCreditsCrew implements OnInit {

  @Input() crewCredits: ResponsePersonCrewCredit[] = [];

  ngOnInit(): void {

  }

}
