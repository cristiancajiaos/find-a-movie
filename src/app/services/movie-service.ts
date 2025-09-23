import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { filter, lastValueFrom, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
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
    return await lastValueFrom(this.http.get<Movie>(`/movie/${id}`));
  }

  public async getMovieCredits(id: number): Promise<Credits> {
    return await lastValueFrom(
      this.http.get<Credits>(`/movie/${id}/credits`)
    );
  }

  public async getMovieCast(id: number): Promise<CastMember[]> {
    return await lastValueFrom(
      this.http.get<Credits>(`/movie/${id}/credits`)
      .pipe(
        map(credits => credits.cast)
      )
    )
  }

  public async getMovieCrew(id: number): Promise<CrewMember[]> {
    return await lastValueFrom(
      this.http.get<Credits>(`/movie/${id}/credits`)
      .pipe(
        map(credits => credits.crew)
      )
    )
  }

  public async getMovieVideos(id: number): Promise<ResponseVideo> {
    return await lastValueFrom(
      this.http.get<ResponseVideo>(`/movie/${id}/videos`)
    );
  }

  public getFormattedMovieTitle(title: string, releaseDate: string): string {
    const movieTitle: string = title;
    const movieYearDate: Date = new Date(releaseDate);
    const movieYear: number = movieYearDate.getFullYear();
    const titleStr: string = `${movieTitle}` + (movieYear ? ` (${movieYear})` : '');
    return titleStr;
  }


}
