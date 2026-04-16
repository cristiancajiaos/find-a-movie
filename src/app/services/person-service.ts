import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { lastValueFrom } from 'rxjs';
import { ResponsePersonMovieCredits } from '../classes/response-person-movie-credits';
import { ResponsePersonCrewCredit } from '../classes/person-movie-credits/response-person-crew-credit';
import { OrderCriteria } from '../interfaces/order-criteria';
import { Order } from '../enums/order';
import { ResponsePersonCastCredit } from '../classes/person-movie-credits/response-person-cast-credit';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(public http: HttpClient) {}

  public async getPerson(id: number): Promise<Person> {
    return await lastValueFrom(this.http.get<Person>(`/person/${id}`));
  }

  public async getCredits(id: number): Promise<ResponsePersonMovieCredits> {
    return await lastValueFrom(
      this.http.get<ResponsePersonMovieCredits>(`/person/${id}/movie_credits`),
    );
  }

  public filterCrewCreditsByRole(
    crewCredits: ResponsePersonCrewCredit[],
    selectedRoles: string[],
  ): ResponsePersonCrewCredit[] {
    return crewCredits.filter(crewCredit => selectedRoles.includes(crewCredit.job))
  }

  public filterCastCreditsByYearFrom(
    castCredits: ResponsePersonCastCredit[],
    fromYear: number,
  ): ResponsePersonCastCredit[] {
    return castCredits
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return !isNaN(date.getFullYear());
      })
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return date.getFullYear() >= fromYear;
      });
  }

   public filterCastCreditsByYearFromTo(
    castCredits: ResponsePersonCastCredit[],
    fromYear: number,
    toYear: number,
  ): ResponsePersonCastCredit[] {
    return castCredits
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return !isNaN(date.getFullYear());
      })
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return date.getFullYear() >= fromYear;
      })
      .filter((castCredit) => {
        const date = new Date(castCredit.release_date);
        return date.getFullYear() <= toYear;
      });
  }

  public orderCastCreditsByOrderCriteria(
    castCredits: ResponsePersonCastCredit[],
    orderCriteria: OrderCriteria,
  ): ResponsePersonCastCredit[] {
    if (orderCriteria.id == Order.TitleAsc) {
      castCredits.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (orderCriteria.id == Order.TitleDesc) {
      castCredits.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    } else if (orderCriteria.id == Order.CharacterNameAsc) {
      castCredits.sort((a, b) => {
        return a.character.localeCompare(b.character);
      });
    } else if (orderCriteria.id == Order.CharacterNameDesc) {
      castCredits.sort((a, b) => {
        return b.character.localeCompare(a.character);
      });
    } else if (orderCriteria.id == Order.ReleaseDateAsc) {
      castCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return aDate.getTime() - bDate.getTime();
      });
    } else if (orderCriteria.id == Order.ReleaseDateDesc) {
      castCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return bDate.getTime() - aDate.getTime();
      });
    }
    return castCredits;
  }

  public filterCrewCreditsByYearFrom(
    crewCredits: ResponsePersonCrewCredit[],
    fromYear: number,
  ): ResponsePersonCrewCredit[] {
    return crewCredits
      .filter((crewCredit) => {
        const date = new Date(crewCredit.release_date);
        return !isNaN(date.getFullYear());
      })
      .filter((crewCredit) => {
        const date = new Date(crewCredit.release_date);
        return date.getFullYear() >= fromYear;
      });
  }

  public filterCrewCreditsByYearFromTo(
    crewCredits: ResponsePersonCrewCredit[],
    fromYear: number,
    toYear: number,
  ): ResponsePersonCrewCredit[] {
    return crewCredits
      .filter((crewCredit) => {
        const date = new Date(crewCredit.release_date);
        return !isNaN(date.getFullYear());
      })
      .filter((crewCredit) => {
        const date = new Date(crewCredit.release_date);
        return date.getFullYear() >= fromYear;
      })
      .filter((crewCredit) => {
        const date = new Date(crewCredit.release_date);
        return date.getFullYear() <= toYear;
      });
  }

  public orderCrewCreditsByOrderCriteria(
    crewCredits: ResponsePersonCrewCredit[],
    orderCriteria: OrderCriteria,
  ): ResponsePersonCrewCredit[] {
    if (orderCriteria.id == Order.TitleAsc) {
      crewCredits.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (orderCriteria.id == Order.TitleDesc) {
      crewCredits.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    } else if (orderCriteria.id == Order.JobAsc) {
      crewCredits.sort((a, b) => {
        return a.job.localeCompare(b.job);
      });
    } else if (orderCriteria.id == Order.JobDesc) {
      crewCredits.sort((a, b) => {
        return b.job.localeCompare(a.job);
      });
    } else if (orderCriteria.id == Order.ReleaseDateAsc) {
      crewCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return aDate.getTime() - bDate.getTime();
      });
    } else if (orderCriteria.id == Order.ReleaseDateDesc) {
      crewCredits.sort((a, b) => {
        const aDate: Date = new Date(a.release_date);
        const bDate: Date = new Date(b.release_date);
        return bDate.getTime() - aDate.getTime();
      });
    }
    return crewCredits;
  }
}
