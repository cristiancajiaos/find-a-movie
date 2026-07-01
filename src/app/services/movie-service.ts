import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { map, Observable, take } from 'rxjs';
import { CastMember } from '../classes/credits/cast-member';
import { Credits } from '../classes/credits';
import { CrewMember } from '../classes/credits/crew-member';
import { ResponseVideo } from '../classes/response-video';
import { ResponseSearchMovie } from '../classes/response-search-movie';
import { ResponseImage } from '../classes/response-image';
import { BackdropImage } from '../classes/response-image/backdrop-image';
import { ResponseNowplayingMovie } from '../classes/response-nowplaying-movie';
import { ResponseUpcomingMovie } from '../classes/response-upcoming-movie';

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

  public getMovieImages(id: number): Observable<BackdropImage[]> {
    return this.http.get<ResponseImage>(`/movie/${id}/images`).pipe(
      take(10),
      map(
        (responseImage) => responseImage.backdrops
      ),

    )
  }

  public getMovieSimilarMovies(id: number): Observable<ResponseSearchMovie> {
    return this.http.get<ResponseSearchMovie>(`/movie/${id}/similar`);
  }

  public getMovieRecommendedMovies(id: number): Observable<ResponseSearchMovie> {
    return this.http.get<ResponseSearchMovie>(`/movie/${id}/recommendations`);
  }

  public getNowPlayingMovies(): Observable<ResponseNowplayingMovie> {
    return this.http.get<ResponseNowplayingMovie>(`/movie/now_playing`);
  }

  public getUpcomingMovies(): Observable<ResponseUpcomingMovie> {
    return this.http.get<ResponseUpcomingMovie>(`/movie/upcoming`);
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
