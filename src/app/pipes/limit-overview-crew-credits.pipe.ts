import { Pipe, type PipeTransform } from '@angular/core';
import { ResponsePersonCrewCredit } from '../classes/person-movie-credits/response-person-crew-credit';

@Pipe({
  name: 'limitOverviewCrewCredits',
  standalone: false
})
export class LimitOverviewCrewCreditsPipe implements PipeTransform {
  transform(crewCredits: ResponsePersonCrewCredit[]): ResponsePersonCrewCredit[] {
    return crewCredits.slice(0,8);
  }
}
