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
    orderCriteria?: OrderCriteria | null,
    fromYear?: number,
    toYear?: number,
  ): any {
    let filteredCastCredits: ResponsePersonCastCredit[] = castCredits.filter((castCredit) => {
      const date = new Date(castCredit.release_date);
      return !isNaN(date.getFullYear());
    });

    if (orderCriteria) {
      if (orderCriteria.id == Order.TitleAsc) {
        filteredCastCredits.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      } else if (orderCriteria.id == Order.TitleDesc) {
        filteredCastCredits.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      } else if (orderCriteria.id == Order.CharacterNameAsc) {
        filteredCastCredits.sort((a, b) => {
          return a.character.localeCompare(b.character);
        });
      } else if (orderCriteria.id == Order.CharacterNameDesc) {
        filteredCastCredits.sort((a, b) => {
          return b.character.localeCompare(a.character);
        });
      } else if (orderCriteria.id == Order.ReleaseDateAsc) {
        filteredCastCredits.sort((a, b) => {
            const aDate: Date = new Date(a.release_date);
            const bDate: Date = new Date(b.release_date);
            return aDate.getTime() - bDate.getTime();
          });
      } else if (orderCriteria.id == Order.ReleaseDateDesc) {
        filteredCastCredits.sort((a, b) => {
            const aDate: Date = new Date(a.release_date);
            const bDate: Date = new Date(b.release_date);
            return bDate.getTime() - aDate.getTime();
          });
      }
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
        });
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
        });
    }

    return filteredCastCredits;
  }
}
