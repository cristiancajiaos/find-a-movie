import { ResponsePersonCastCredit } from './person-movie-credits/response-person-cast-credit';
import { ResponsePersonCrewCredit } from './person-movie-credits/response-person-crew-credit';

export class ResponsePersonMovieCredits {
  public id: number;
  public cast: ResponsePersonCastCredit[];
  public crew: ResponsePersonCrewCredit[];

  constructor() {
    this.id = 0;
    this.cast = [];
    this.crew = [];
  }
}
