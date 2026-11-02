import { ResponsePersonCrewCredit } from './../classes/person-movie-credits/response-person-crew-credit';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { map, Observable, of, tap } from 'rxjs';
import { ResponsePersonMovieCredits } from '../classes/response-person-movie-credits';
import { ResponsePersonCastCredit } from '../classes/person-movie-credits/response-person-cast-credit';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  public http = inject(HttpClient);

  public person = new Map<string, Person>();
  public credits = new Map<string, ResponsePersonMovieCredits>();
  public castCredits = new Map<string, ResponsePersonCastCredit[]>();
  public crewCredits = new Map<string, ResponsePersonCrewCredit[]>();

  public getPerson(id: number): Observable<Person> {
    if (this.person.has(`person-${id}`)) {
      return of(this.person.get(`person-${id}`));
    }
    return this.http.get<Person>(`/person/${id}`).pipe(
      tap(person => this.person.set(`person-${id}`, person))
    )
  }

  public getCredits(id: number): Observable<ResponsePersonMovieCredits> {
    if (this.credits.has(`credits-${id}`)) {
      return of(this.credits.get(`credits-${id}`));
    }
    
    return this.http.get<ResponsePersonMovieCredits>(`/person/${id}/movie_credits`).pipe(
      tap(movieCredits => {
        this.credits.set(`credits-${id}`, movieCredits)
        this.castCredits.set(`castCredits-${id}`, movieCredits.cast);
        this.crewCredits.set(`crewCredits-${id}`, movieCredits.crew);
      })
    )
  }

  public getCastCredits(id: number): Observable<ResponsePersonCastCredit[]> {
    if (this.castCredits.has(`castCredits-${id}`)) {
      return of(this.castCredits.get(`castCredits-${id}`));
    }
    return this.http.get<ResponsePersonMovieCredits>(`/person/${id}/movie_credits`).pipe(
      map(movieCredits => movieCredits.cast),
      tap(castCredits => this.castCredits.set(`castCredits-${id}`, castCredits))
    )
  }

  public getCrewCredits(id: number): Observable<ResponsePersonCrewCredit[]> {
    if (this.crewCredits.has(`crewCredits-${id}`)) {
      return of(this.crewCredits.get(`crewCredits-${id}`));
    }
    return this.http.get<ResponsePersonMovieCredits>(`/person/${id}/movie_credits`).pipe(
      map(movieCredits => movieCredits.crew),
      tap(crewCredits => this.crewCredits.set(`crewCredits-${id}`, crewCredits))
    )
  }
}
