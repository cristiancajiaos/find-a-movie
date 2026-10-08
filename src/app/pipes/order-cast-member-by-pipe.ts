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
      } else if (orderCriteria.id == Order.NameAsc) {
        movieCast.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (orderCriteria.id == Order.NameDesc) {
        movieCast.sort((a, b) => {
          return b.name.localeCompare(a.name);
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
