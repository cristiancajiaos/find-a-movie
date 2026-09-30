import { Pipe, type PipeTransform } from '@angular/core';
import { CrewMember } from '../classes/credits/crew-member';
import { OrderCriteria } from '../interfaces/order-criteria';
import { Order } from '../enums/order';

@Pipe({
  name: 'orderCrewMemberBy',
  standalone: false,
})
export class OrderCrewMemberByPipe implements PipeTransform {
  transform(movieCrew: CrewMember[], orderCriteria: OrderCriteria): CrewMember[] {
    if (orderCriteria.id == Order.NameAsc) {
      movieCrew.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (orderCriteria.id == Order.NameDesc) {
      movieCrew.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (orderCriteria.id == Order.JobAsc) {
      movieCrew.sort((a, b) => {
        return a.job.localeCompare(b.job);
      });
    } else if (orderCriteria.id == Order.JobDesc) {
      movieCrew.sort((a, b) => {
        return b.job.localeCompare(a.job);
      });
    }
    return movieCrew;
  }
}
