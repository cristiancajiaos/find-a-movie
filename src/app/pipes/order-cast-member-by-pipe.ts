import { Pipe, type PipeTransform } from '@angular/core';
import { CastMember } from '../classes/credits/cast-member';
import { OrderCriteria } from '../interfaces/order-criteria';
import { Order } from '../enums/order';
import { SortCriteria } from '../interfaces/sort-criteria';
import { Sort } from '../enums/sort';

@Pipe({
  name: 'orderCastMemberBy',
  standalone: false,
})
export class OrderCastMemberByPipe implements PipeTransform {
  transform(movieCast: CastMember[], sortCriteria: SortCriteria | null): CastMember[] {
    if (sortCriteria) {
      if (sortCriteria.id == Sort.CastOrderAsc) {
        movieCast.sort((a, b) => {
          return a.order - b.order;
        });
      } else if (sortCriteria.id == Sort.CastOrderDesc) {
        movieCast.sort((a, b) => {
          return b.order - a.order;
        });
      } else if (sortCriteria.id == Sort.FirstNameAsc) {
        movieCast.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (sortCriteria.id == Sort.FirstNameDesc) {
        movieCast.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      } else if (sortCriteria.id == Sort.LastNameAsc) {
        movieCast.sort((a, b) => {
          const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
          const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
          return lastNameA.localeCompare(lastNameB);
        });
      } else if (sortCriteria.id == Sort.LastNameDesc) {
        movieCast.sort((a, b) => {
          const lastNameA: string = a.name.split(/\s/)[a.name.split(/\s/).length - 1];
          const lastNameB: string = b.name.split(/\s/)[b.name.split(/\s/).length - 1];
          return lastNameB.localeCompare(lastNameA);
        });
      } else if (sortCriteria.id == Sort.CharacterNameAsc) {
        movieCast.sort((a, b) => {
          return a.character.localeCompare(b.character);
        });
      } else if (sortCriteria.id == Sort.CharacterNameDesc) {
        movieCast.sort((a, b) => {
          return b.character.localeCompare(a.character);
        });
      }
    }

    return movieCast;
  }
}
