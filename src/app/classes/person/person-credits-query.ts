export class PersonCreditsQuery {
  public resultsPerPage: number;
  public sort: string;
  public roles: string[];
  public fromYear: number;
  public toYear: number;

  constructor() {
    this.resultsPerPage = null;
    this.sort = null;
    this.roles = [];
    this.fromYear = null;
    this.toYear = null;
  }
}
