import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { lastValueFrom } from 'rxjs';

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

}
