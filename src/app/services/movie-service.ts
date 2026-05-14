import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { catchError, lastValueFrom, map, Observable, of } from 'rxjs';
import { CastMember } from '../classes/credits/cast-member';
import { Credits } from '../classes/credits';
import { CrewMember } from '../classes/credits/crew-member';
import { ResponseVideo } from '../classes/response-video';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) {}

  public async getMovie(id: number): Promise<Movie> {
    return await lastValueFrom(
      this.http.get<Movie>(`/movie/${id}?language=en-US`).pipe(
        catchError(err => of())
      )
    )
  }

  public getMovieAlt(id: number): Observable<Movie> {
    return this.http.get<Movie>((`/movie/${id}`));
  }

  public async getMovieCredits(id: number): Promise<Credits> {
    return await lastValueFrom(
      this.http.get<Credits>(`/movie/${id}/credits`).pipe(
        catchError(err => of())
      )
    );
  }

  public getMovieCreditsAlt(id: number): Observable<Credits> {
    return this.http.get<Credits>((`/movie/${id}/credits`));
  }

  public async getMovieCast(id: number): Promise<CastMember[]> {
    return await lastValueFrom(
      this.http.get<Credits>(`/movie/${id}/credits`)
      .pipe(
        map(credits => credits.cast),
        catchError(err => of([]))
      )
    )
  }

  public async getMovieCrew(id: number): Promise<CrewMember[]> {
    return await lastValueFrom(
      this.http.get<Credits>(`/movie/${id}/credits`)
      .pipe(
        map(credits => credits.crew),
        catchError(err => of([]))
      )
    )
  }

  public async getMovieVideos(id: number): Promise<ResponseVideo> {
    return await lastValueFrom(
      this.http.get<ResponseVideo>(`/movie/${id}/videos`).pipe(
        catchError(err => of())
      )
    );
  }

  public getMovieVideosAlt(id: number): Observable<ResponseVideo> {
    return this.http.get<ResponseVideo>(`/movie/${id}/videos`);
  }

  public getFormattedMovieTitle(title: string, originalTitle: string, releaseDate: string): string {
    const movieTitle: string = title;
    const movieYearDate: Date = new Date(releaseDate);
    const movieYear: number = movieYearDate.getFullYear();
    let movieFormattedTitle: string = movieTitle.toLowerCase().includes(originalTitle.toLowerCase()) ? `${movieTitle}` : `${movieTitle} (${originalTitle})`;
    let movieFormattedYear: string = movieYear ? `${movieYear}` : 'No Release Date';
    const titleStr: string = `${movieFormattedTitle} (${movieFormattedYear})`;
    return titleStr;
  }
}
