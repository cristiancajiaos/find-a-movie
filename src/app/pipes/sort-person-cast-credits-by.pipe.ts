import { Pipe, type PipeTransform } from '@angular/core';
import { ResponsePersonCastCredit } from '../classes/person-movie-credits/response-person-cast-credit';
import { SortCriteria } from '../interfaces/sort-criteria';
import { Sort } from '../enums/sort';

@Pipe({
  name: 'sortPersonCastCreditsBy',
  standalone: false
})
export class SortPersonCastCreditsByPipe implements PipeTransform {
  transform(
      castCredits: ResponsePersonCastCredit[],
      sortCriteria?: SortCriteria | null,
      fromYear?: number | null,
      toYear?: number | null,
    ): ResponsePersonCastCredit[] {
      let filteredCastCredits: ResponsePersonCastCredit[] = castCredits.filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return !isNaN(date.getFullYear());
      });

      if (sortCriteria) {
        if (sortCriteria.id == Sort.TitleAsc) {
          filteredCastCredits.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (sortCriteria.id == Sort.TitleDesc) {
          filteredCastCredits.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        } else if (sortCriteria.id == Sort.CharacterNameAsc) {
          filteredCastCredits.sort((a, b) => {
            return a.character.localeCompare(b.character);
          });
        } else if (sortCriteria.id == Sort.CharacterNameDesc) {
          filteredCastCredits.sort((a, b) => {
            return b.character.localeCompare(a.character);
          });
        } else if (sortCriteria.id == Sort.ReleaseDateAsc) {
          filteredCastCredits.sort((a, b) => {
              const aDate: Date = new Date(a.release_date);
              const bDate: Date = new Date(b.release_date);
              return aDate.getTime() - bDate.getTime();
            });
        } else if (sortCriteria.id == Sort.ReleaseDateDesc) {
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
