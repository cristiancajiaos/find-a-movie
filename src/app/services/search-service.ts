import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSearchMovie } from '../classes/response-search-movie';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor (
    private http: HttpClient
  ){}

  public async searchMovie(query: string, page: number = 1): Promise<ResponseSearchMovie> {
    return await lastValueFrom(this.http.get<ResponseSearchMovie>(
      `/search/movie?query=${query}`, {
        params: {
          language: 'en-US',
          page: page
        }
      }
    ));
  }
}
