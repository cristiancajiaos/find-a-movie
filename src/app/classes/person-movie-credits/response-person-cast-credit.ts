export class ResponsePersonCastCredit {
  public adult: boolean;
  public backdrop_path: string;
  public genre_ids: number[];
  public id: number;
  public original_language: string;
  public original_title: string;
  public overview: string;
  public popularity: number;
  public poster_path: string;
  public release_date: string;
  public title: string;
  public video: boolean;
  public vote_average: number;
  public vote_count: number;
  public character: string;
  public credit_id: string;
  public order: number;

  constructor() {
    this.adult = false;
    this.backdrop_path = '';
    this.genre_ids = [];
    this.id = 0;
    this.original_language = '';
    this.original_title = '';
    this.overview = '';
    this.popularity = 0;
    this.poster_path = '';
    this.release_date = '';
    this.title = '';
    this.video = false;
    this.vote_average = 0;
    this.vote_count = 0;
    this.character = '';
    this.credit_id = '';
    this.order = 0;
  }
}
