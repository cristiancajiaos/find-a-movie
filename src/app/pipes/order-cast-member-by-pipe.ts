import { Pipe, type PipeTransform } from '@angular/core';
import { CastMember } from '../classes/credits/cast-member';
import { OrderCriteria } from '../interfaces/order-criteria';
import { Order } from '../enums/order';

@Pipe({
  name: 'orderCastMemberBy',
  standalone: false,
})
export class OrderCastMemberByPipe implements PipeTransform {
  transform(movieCast: CastMember[], orderCriteria: OrderCriteria | null): CastMember[] {
    if (orderCriteria) {
      if (orderCriteria.id == Order.CastOrderAsc) {
        movieCast.sort((a, b) => {
          return a.order - b.order;
        });
      } else if (orderCriteria.id == Order.CastOrderDesc) {
        movieCast.sort((a, b) => {
          return b.order - a.order;
        });
      } else if (orderCriteria.id == Order.FirstNameAsc) {
        movieCast.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (orderCriteria.id == Order.FirstNameDesc) {
        movieCast.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      } else if (orderCriteria.id == Order.LastNameAsc) {
        movieCast.sort((a, b) => {
          const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
          const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
          return lastNameA.localeCompare(lastNameB);
        });
      } else if (orderCriteria.id == Order.LastNameDesc) {
        movieCast.sort((a, b) => {
          const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
          const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
          return lastNameB.localeCompare(lastNameA);
        });
      } else if (orderCriteria.id == Order.CharacterNameAsc) {
        movieCast.sort((a, b) => {
          return a.character.localeCompare(b.character);
        });
      } else if (orderCriteria.id == Order.CharacterNameDesc) {
        movieCast.sort((a, b) => {
          return b.character.localeCompare(a.character);
        });
      }
    }

    return movieCast;
  }
}
