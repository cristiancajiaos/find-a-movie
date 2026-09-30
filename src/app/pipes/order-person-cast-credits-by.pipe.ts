import { Pipe, PipeTransform } from '@angular/core';
import { ResponsePersonCastCredit } from '../classes/person-movie-credits/response-person-cast-credit';
import { OrderCriteria } from '../interfaces/order-criteria';
import { Order } from '../enums/order';

@Pipe({
  name: 'orderPersonCastCreditsBy',
  standalone: false,
})
export class OrderPersonCastCreditsByPipe implements PipeTransform {
  transform(
    castCredits: ResponsePersonCastCredit[],
    orderCriteria?: OrderCriteria,
    fromYear?: number,
    toYear?: number,
  ): any {
    let filteredCastCredits: ResponsePersonCastCredit[] = castCredits;
    if (orderCriteria.id == Order.TitleAsc) {
      filteredCastCredits = castCredits.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (orderCriteria.id == Order.TitleDesc) {
      filteredCastCredits = castCredits.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    } else if (orderCriteria.id == Order.CharacterNameAsc) {
      filteredCastCredits = castCredits.sort((a, b) => {
        return a.character.localeCompare(b.character);
      });
    } else if (orderCriteria.id == Order.CharacterNameDesc) {
      filteredCastCredits = castCredits.sort((a, b) => {
        return b.character.localeCompare(a.character);
      });
    } else if (orderCriteria.id == Order.ReleaseDateAsc) {
      filteredCastCredits = castCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return aDate.getTime() - bDate.getTime();
      });
    } else if (orderCriteria.id == Order.ReleaseDateDesc) {
      filteredCastCredits = castCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return bDate.getTime() - aDate.getTime();
      });
    }

    if (fromYear) {
      filteredCastCredits = filteredCastCredits
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return !isNaN(date.getFullYear());
      })
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return date.getFullYear() >= fromYear;
      })
    }

    if (toYear) {
      filteredCastCredits = filteredCastCredits
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return !isNaN(date.getFullYear());
      })
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return date.getFullYear() <= toYear;
      })
    }

    return filteredCastCredits;
  }
}
