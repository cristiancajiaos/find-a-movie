import { NowplayingMovieDates } from './response-nowplaying-movie/nowplaying-movie-dates';
import { ResponseMovieResult } from './response-search-movie/response-movie-result';

export class ResponseNowplayingMovie {
  public dates: NowplayingMovieDates;
  public page: number;
  public results: ResponseMovieResult[];
  public total_pages: number;
  public total_results: number;

  constructor() {
    this.dates = new NowplayingMovieDates();
    this.page = 0;
    this.results = [];
    this.total_pages = 0;
    this.total_results = 0;
  }
}
