import { ResponsePersonResult } from "./response-search-person/response-person-result";

export class ResponseSearchPerson {
  public page: number;
  public results: ResponsePersonResult[];
  public total_pages: number;
  public total_results: number;

  constructor() {
    this.page = 0;
    this.results = [];
    this.total_pages = 0;
    this.total_results = 0;
  }
}
