import { Pipe, type PipeTransform } from '@angular/core';
import { CrewMember } from '../classes/credits/crew-member';

@Pipe({
  name: 'sortCrewMembersByLastName',
  standalone: false
})
export class SortCrewMembersByLastNamePipe implements PipeTransform {
  transform(crewMembers: CrewMember[]): CrewMember[] {
    crewMembers.sort((a, b) => {
      const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
      const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
      return lastNameA.localeCompare(lastNameB);
    });

    return crewMembers;
  }
}
