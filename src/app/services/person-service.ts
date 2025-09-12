import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { lastValueFrom } from 'rxjs';
import { Credits } from '../classes/credits';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    public http: HttpClient
  ) {}

  public async getPerson(id: number): Promise<Person> {
    return await lastValueFrom(this.http.get<Person>(`/person/${id}`));
  }

  public async getCredits(id: number): Promise<Credits> {
    return await lastValueFrom(this.http.get<Credits>(`/person/${id}/movie_credits`) );
  }

}
