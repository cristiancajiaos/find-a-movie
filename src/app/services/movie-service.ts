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

  public getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>((`/movie/${id}`));
  }

  public getMovieCredits(id: number): Observable<Credits> {
    return this.http.get<Credits>((`/movie/${id}/credits`));
  }

  public getMovieCast(id: number): Observable<CastMember[]> {
    return this.http.get<Credits>(`/movie/${id}/credits`).pipe(
      map(credits => credits.cast)
    )
  }

  public getMovieCrew(id: number): Observable<CrewMember[]> {
    return this.http.get<Credits>(`/movie/${id}/credits`).pipe(
      map(credits => credits.crew)
    )
  }

  public getMovieVideos(id: number): Observable<ResponseVideo> {
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
