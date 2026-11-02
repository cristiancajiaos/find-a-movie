import { Pipe, type PipeTransform } from '@angular/core';
import { ResponsePersonCastCredit } from '../classes/person-movie-credits/response-person-cast-credit';

@Pipe({
  name: 'limitOverviewCastCredits',
  standalone: false
})
export class LimitOverviewCastCreditsPipe implements PipeTransform {
  transform(castCredits: ResponsePersonCastCredit[]): ResponsePersonCastCredit[] {
    return castCredits.slice(0,8);
  }
}
