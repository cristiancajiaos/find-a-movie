import { Pipe, type PipeTransform } from '@angular/core';
import { ResponsePersonCrewCredit } from '../classes/person-movie-credits/response-person-crew-credit';
import { SortCriteria } from '../interfaces/sort-criteria';
import { Sort } from '../enums/sort';

@Pipe({
  name: 'sortPersonCrewCreditsBy',
  standalone: false
})
export class SortPersonCrewCreditsByPipe implements PipeTransform {
  transform(
      crewCredits: ResponsePersonCrewCredit[],
      orderCriteria?: SortCriteria | null,
      selectedRoles?: string[] | null,
      fromYear?: number | null,
      toYear?: number | null,
    ): ResponsePersonCrewCredit[] {
      let filteredCrewCredits: ResponsePersonCrewCredit[] = crewCredits.filter((crewCredit) => {
        const date = new Date(crewCredit.release_date);
        return !isNaN(date.getFullYear());
      });

      if (orderCriteria) {
        if (orderCriteria.id == Sort.TitleAsc) {
          filteredCrewCredits.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
        } else if (orderCriteria.id == Sort.TitleDesc) {
          filteredCrewCredits.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        } else if (orderCriteria.id == Sort.JobAsc) {
          filteredCrewCredits.sort((a, b) => {
            return a.job.localeCompare(b.job);
          });
        } else if (orderCriteria.id == Sort.JobDesc) {
          filteredCrewCredits.sort((a, b) => {
            return b.job.localeCompare(a.job);
          });
        } else if (orderCriteria.id == Sort.ReleaseDateAsc) {
          filteredCrewCredits.sort((a, b) => {
            const aDate: Date = new Date(a.release_date);
            const bDate: Date = new Date(b.release_date);
            return aDate.getTime() - bDate.getTime();
          });
        } else if (orderCriteria.id == Sort.ReleaseDateDesc) {
          filteredCrewCredits.sort((a, b) => {
            const aDate: Date = new Date(a.release_date);
            const bDate: Date = new Date(b.release_date);
            return bDate.getTime() - aDate.getTime();
          });
        }
      }

      if (selectedRoles && selectedRoles.length > 0) {
        filteredCrewCredits = filteredCrewCredits.filter((crewCredit) => {
          return selectedRoles.includes(crewCredit.job);
        });
      }

      if (fromYear) {
        filteredCrewCredits = filteredCrewCredits
          .filter((crewCredit) => {
            const date = new Date(crewCredit.release_date);
            return !isNaN(date.getFullYear());
          })
          .filter((crewCredit) => {
            const date = new Date(crewCredit.release_date);
            return date.getFullYear() >= fromYear;
          });
      }

      if (toYear) {
        filteredCrewCredits = filteredCrewCredits
          .filter((crewCredit) => {
            const date = new Date(crewCredit.release_date);
            return !isNaN(date.getFullYear());
          })
          .filter((crewCredit) => {
            const date = new Date(crewCredit.release_date);
            return date.getFullYear() <= toYear;
          });
      }

      return filteredCrewCredits;
    }
}
