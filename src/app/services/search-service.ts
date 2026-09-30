import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseSearchMovie } from '../classes/response-search-movie';
import { map, Observable, of, tap } from 'rxjs';
import { ResponseSearchPerson } from '../classes/response-search-person';
import { ResponseMovieResult } from '../classes/response-search-movie/response-movie-result';
import { ResponsePersonResult } from '../classes/response-search-person/response-person-result';
import { SkipLoading } from '../interceptors/loading-interceptor';
@Injectable({
  providedIn: 'root',
})
export class SearchService {

  private http = inject(HttpClient);

  private movieResults = new Map<string, ResponseSearchMovie>();
  private personResults = new Map<string, ResponseSearchPerson>();
  private movieInputResults = new Map<string, ResponseMovieResult[]>();
  private personInputResults = new Map<string, ResponsePersonResult[]>();

  public searchMovie(query: string, page: number = 1): Observable<ResponseSearchMovie> {
    const queryCached = query.replace(/\s/, '').trim();
    if (this.movieResults.has(`movieResults-${queryCached}-${page}`)) {
      return of(this.movieResults.get(`movieResults-${queryCached}-${page}`));
    }

    return this.http.get<ResponseSearchMovie>(`/search/movie`, {
      params: {
        query: query,
        language: 'en-US',
        page: page,
      }
    }).pipe(
      tap(movieResults => this.movieResults.set(`movieResults-${queryCached}-${page}`, movieResults))
    )
  }

  public searchPerson(query: string, page: number = 1): Observable<ResponseSearchPerson> {
    const queryCached = query.replace(/\s/, '').trim();
    if (this.personResults.has(`personResults-${queryCached}-${page}`)) {
      return of(this.personResults.get(`personResults-${queryCached}-${page}`));
    }
    return this.http.get<ResponseSearchPerson>('/search/person', {
      params: {
        query: query,
        language: 'en-US',
        page: page,
      },
    }).pipe(
      tap(personResults => this.personResults.set(`personResults-${queryCached}-${page}`, personResults))
    )
  }

  public searchMovieInput(query: string, page: number = 1): Observable<ResponseMovieResult[]> {
    const queryCached = query.replace(/\s/, '').trim();
    if (this.movieInputResults.has(`movieInputResults-${queryCached}`)) {
      return of(this.movieInputResults.get(`movieInputResults-${queryCached}`));
    }
    return this.http
      .get<ResponseSearchMovie>('/search/movie', {
        params: {
          query: query,
          language: 'en-US',
          page: page,
        },
        context: new HttpContext().set(SkipLoading, true)
      })
      .pipe(
        map((responseSearchMovie) => responseSearchMovie.results),
        tap(movieResults => this.movieInputResults.set(`movieInputResults-${query}`, movieResults))
      );
  }

  public searchPersonInput(query: string, page: number = 1): Observable<ResponsePersonResult[]> {
    const queryCached = query.replace(/\s/, '').trim();
    if (this.personInputResults.has(`personInputResults-${queryCached}`)) {
      return of(this.personInputResults.get(`personInputResults-${queryCached}`));
    }
    return this.http
      .get<ResponseSearchPerson>('/search/person', {
        params: {
          query: query,
          language: 'en-US',
          page: page,
        },
        context: new HttpContext().set(SkipLoading, true)
      })
      .pipe(
        map((responsePersonResult) => responsePersonResult.results),
        tap(personResults => this.personInputResults.set(`personInputResults-${queryCached}`, personResults))
      );
  }
}
