import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSearchMovie } from '../classes/response-search-movie';
import { catchError, lastValueFrom, map, Observable, of } from 'rxjs';
import { ResponseSearchPerson } from '../classes/response-search-person';
import { ResponseMovieResult } from '../classes/response-search-movie/response-movie-result';
import { ResponsePersonResult } from '../classes/response-search-person/response-person-result';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public searchMovie(query: string, page: number = 1): Observable<ResponseSearchMovie> {
    return this.http.get<ResponseSearchMovie>(`/search/movie`, {
      params: {
        query: query,
        language: 'en-US',
        page: page,
      },
    });
  }

  public searchPerson(query: string, page: number = 1): Observable<ResponseSearchPerson> {
    return this.http.get<ResponseSearchPerson>('/search/person', {
      params: {
        query: query,
        language: 'en-US',
        page: page,
      },
    });
  }

  public searchMovieInput(query: string, page: number = 1): Observable<ResponseMovieResult[]> {
    return this.http
      .get<ResponseSearchMovie>('/search/movie', {
        params: {
          query: query,
          language: 'en-US',
          page: page,
        },
      })
      .pipe(map((responseSearchMovie) => responseSearchMovie.results));
  }

  public searchPersonInput(query: string, page: number = 1): Observable<ResponsePersonResult[]> {
    return this.http
      .get<ResponseSearchPerson>('/search/person', {
        params: {
          query: query,
          language: 'en-US',
          page: page,
        },
      })
      .pipe(map((responsePersonResult) => responsePersonResult.results));
  }
}
