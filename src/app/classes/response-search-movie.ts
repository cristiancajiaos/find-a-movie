import { ResponseMovieResult } from "./response-search-movie/response-movie-result";

export class ResponseSearchMovie {
  public page: number;
  public results: ResponseMovieResult[];
  public total_pages: number;
  public total_results: number;

  constructor() {
    this.page = 0;
    this.results = [];
    this.total_pages = 0;
    this.total_results = 0;
  }
}
