import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { map, Observable, of, take, tap } from 'rxjs';
import { CastMember } from '../classes/credits/cast-member';
import { Credits } from '../classes/credits';
import { CrewMember } from '../classes/credits/crew-member';
import { ResponseVideo } from '../classes/response-video';
import { ResponseSearchMovie } from '../classes/response-search-movie';
import { ResponseImage } from '../classes/response-image';
import { BackdropImage } from '../classes/response-image/backdrop-image';
import { ResponseMovieResult } from '../classes/response-search-movie/response-movie-result';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private trendingMovies = new Map<string, ResponseMovieResult[]>();

  private movie = new Map<string, Movie>();
  private credits = new Map<string, Credits>();
  private creditsCast = new Map<string, CastMember[]>();
  private creditsCrew = new Map<string, CrewMember[]>();
  private movieVideos = new Map<string, ResponseVideo>();
  private movieImages = new Map<string, BackdropImage[]>();
  private movieRecommendations = new Map<string, ResponseMovieResult[]>();
  private movieSimilar = new Map<string, ResponseMovieResult[]>();

  private http = inject(HttpClient);

  public getMovie(id: number): Observable<Movie> {
    if (this.movie.has(`movie-${id}`)) {
      return of(this.movie.get(`movie-${id}`));
    }

    return this.http.get<Movie>((`/movie/${id}`)).pipe(
      tap(
        movie => this.movie.set(`movie-${id}`, movie)
      )
    )
  }

  public getMovieCredits(id: number): Observable<Credits> {
    if (this.credits.has(`credits-${id}`)) {
      return of(this.credits.get(`credits-${id}`));
    }

    return this.http.get<Credits>((`/movie/${id}/credits`)).pipe(
      tap(credits => {
        this.credits.set(`credits-${id}`, credits);
        this.creditsCast.set(`creditsCast-${id}`, credits.cast);
        this.creditsCrew.set(`creditsCrew-${id}`, credits.crew);
      })
    )
  }

  public getMovieCast(id: number): Observable<CastMember[]> {
    if (this.creditsCast.has(`creditsCast-${id}`)) {
      return of(this.creditsCast.get(`creditsCast-${id}`));
    }

    return this.http.get<Credits>(`/movie/${id}/credits`).pipe(
      map(credits => credits.cast),
      tap(castCredits => {
        this.creditsCast.set(`creditsCast-${id}`, castCredits);
      })
    )
  }

  public getMovieCrew(id: number): Observable<CrewMember[]> {
    if (this.creditsCrew.has(`creditsCrew-${id}`)) {
      return of(this.creditsCrew.get(`creditsCrew-${id}`));
    }

    return this.http.get<Credits>(`/movie/${id}/credits`).pipe(
      map(credits => credits.crew),
      tap(crewCredits => {
        this.creditsCrew.set(`creditsCrew-${id}`, crewCredits);
      })
    )
  }

  public getMovieVideos(id: number): Observable<ResponseVideo> {
    if (this.movieVideos.has(`movieVideos-${id}`)) {
      return of(this.movieVideos.get(`movieVideos-${id}`));
    }
    return this.http.get<ResponseVideo>(`/movie/${id}/videos`).pipe(
      tap(responseVideo => this.movieVideos.set(`movieVideos-${id}`, responseVideo))
    )
  }

  public getMovieImages(id: number): Observable<BackdropImage[]> {
    if (this.movieImages.has(`movieImages-${id}`)) {
      return of(this.movieImages.get(`movieImages-${id}`))
    }

    return this.http.get<ResponseImage>(`/movie/${id}/images`).pipe(
      map(
        (responseImage) => responseImage.backdrops
      ),
      map(
        movieImages => movieImages.slice(0,10)
      ),
      map(
        movieImages => movieImages.map(movieImage => {
          movieImage.file_path = `${environment.imgUrl}${environment.backdropSize}${movieImage.file_path}`;
          return movieImage;
        })
      ),
      tap(movieImages => this.movieImages.set(`movieImages-${id}`, movieImages))
    )
  }

  public getMovieRecommendedMovies(id: number): Observable<ResponseMovieResult[]> {
    if (this.movieRecommendations.has(`movieRecommendations-${id}`)) {
      return of(this.movieRecommendations.get(`movieRecommendations-${id}`));
    }
    return this.http.get<ResponseSearchMovie>(`/movie/${id}/recommendations`).pipe(
      map(responseMovieResult => responseMovieResult.results),
      tap(movieResults => this.movieRecommendations.set(`movieRecommendations-${id}`, movieResults))
    )
  }

  public getMovieSimilarMovies(id: number): Observable<ResponseMovieResult[]> {
    if (this.movieSimilar.has(`movieSimilar-${id}`)) {
      return of(this.movieSimilar.get(`movieSimilar-${id}`));
    }
    return this.http.get<ResponseSearchMovie>(`/movie/${id}/similar`).pipe(
      map(responseMovieResult => responseMovieResult.results),
      tap(movieResults => this.movieSimilar.set(`movieSimilar-${id}`, movieResults))
    )
  }

  public getTrendingMovies(): Observable<ResponseMovieResult[]> {
    if (this.trendingMovies.has('trendingMovies')) {
      return of(this.trendingMovies.get('trendingMovies'));
    }

    return this.http.get<ResponseSearchMovie>(`/trending/movie/day`).pipe(
      map(
        responseSearchMovie => responseSearchMovie.results.slice(0,10).map(movie => {
          movie.backdrop_path = `${environment.imgUrl}${environment.backdropSize}${movie.backdrop_path}`
          return movie;
        })
      ),
      tap(movieResults => this.trendingMovies.set('trendingMovies', movieResults))
    )
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
