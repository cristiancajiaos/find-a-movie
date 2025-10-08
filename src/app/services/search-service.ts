import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSearchMovie } from '../classes/response-search-movie';
import { lastValueFrom } from 'rxjs';
import { ResponseSearchPerson } from '../classes/response-search-person';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor (
    private http: HttpClient
  ){}

  public async searchMovie(query: string, page: number = 1): Promise<ResponseSearchMovie> {
    return await lastValueFrom(this.http.get<ResponseSearchMovie>(
      `/search/movie`, {
        params: {
          query: query,
          language: 'en-US',
          page: page
        }
      }
    ));
  }

  public async searchPerson(query: string, page: number = 1): Promise<ResponseSearchPerson> {
    return await lastValueFrom(this.http.get<ResponseSearchPerson>(
      '/search/person', {
        params: {
          query: query,
          language: 'en-US',
          page: page
        }
      }
    ));
  }
}
