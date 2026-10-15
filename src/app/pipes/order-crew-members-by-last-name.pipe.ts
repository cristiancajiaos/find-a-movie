import { Pipe, PipeTransform } from '@angular/core';
import { CrewMember } from '../classes/credits/crew-member';

@Pipe({
  name: 'orderCrewMembersByLastName',
  standalone: false
})
export class OrderCrewMembersByLastNamePipe implements PipeTransform {

  transform(crewMembers: CrewMember[]): CrewMember[] {
    crewMembers.sort((a, b) => {
      const lastNameA = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
      const lastNameB = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
      return lastNameA.localeCompare(lastNameB);
    });

    return crewMembers;
  }

}
