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

  private movieResponse = new Map<string, ResponseSearchMovie>();
  private personResponse = new Map<string, ResponseSearchPerson>();
  private movieInputResults = new Map<string, ResponseMovieResult[]>();
  private personInputResults = new Map<string, ResponsePersonResult[]>();

  public searchMovie(query: string, page: number = 1): Observable<ResponseSearchMovie> {
    const queryCached = query.replace(/\s/, '').trim();
    if (this.movieResponse.has(`movieResponse-${queryCached}-${page}`)) {
      return of(this.movieResponse.get(`movieResponse-${queryCached}-${page}`));
    }

    return this.http.get<ResponseSearchMovie>(`/search/movie`, {
      params: {
        query: query,
        language: 'en-US',
        page: page,
      }
    }).pipe(
      tap(movieResponse => this.movieResponse.set(`movieResponse-${queryCached}-${page}`, movieResponse))
    )
  }

  public searchPerson(query: string, page: number = 1): Observable<ResponseSearchPerson> {
    const queryCached = query.replace(/\s/, '').trim();
    if (this.personResponse.has(`personResponse-${queryCached}-${page}`)) {
      return of(this.personResponse.get(`personResponse-${queryCached}-${page}`));
    }
    return this.http.get<ResponseSearchPerson>('/search/person', {
      params: {
        query: query,
        language: 'en-US',
        page: page,
      },
    }).pipe(
      tap(personResponse => this.personResponse.set(`personResponse-${queryCached}-${page}`, personResponse))
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
        map((responseSearchMovie) => responseSearchMovie.results.filter((movieResult) => {
          const date = new Date(movieResult.release_date);
          return !isNaN(date.getFullYear());
        })),
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
