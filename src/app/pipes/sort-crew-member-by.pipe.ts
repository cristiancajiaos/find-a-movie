import { Pipe, type PipeTransform } from '@angular/core';
import { CrewMember } from '../classes/credits/crew-member';
import { SortCriteria } from '../interfaces/sort-criteria';
import { Sort } from '../enums/sort';

@Pipe({
  name: 'sortCrewMemberBy',
  standalone: false
})
export class SortCrewMemberByPipe implements PipeTransform {
  transform(movieCrew: CrewMember[], sortCriteria: SortCriteria): CrewMember[] {
      if (sortCriteria.id == Sort.FirstNameAsc) {
        movieCrew.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (sortCriteria.id == Sort.FirstNameDesc) {
        movieCrew.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      } else if (sortCriteria.id == Sort.LastNameAsc) {
        movieCrew.sort((a, b) => {
          const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
          const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
          return lastNameA.localeCompare(lastNameB);
        });
      } else if (sortCriteria.id == Sort.LastNameDesc) {
        movieCrew.sort((a, b) => {
          const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
          const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
          return lastNameB.localeCompare(lastNameA);
        });
      } else if (sortCriteria.id == Sort.JobAsc) {
        movieCrew.sort((a, b) => {
          return a.job.localeCompare(b.job);
        });
      } else if (sortCriteria.id == Sort.JobDesc) {
        movieCrew.sort((a, b) => {
          return b.job.localeCompare(a.job);
        });
      }
      return movieCrew;
    }
}
