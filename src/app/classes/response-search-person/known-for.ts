export class KnownFor {
  public adult: boolean;
  public backdrop_path: string;
  public id: number;
  public title: string;
  public original_language: string;
  public original_title: string;
  public overview: string;
  public poster_path: string;
  public media_type: string;
  public genre_ids: number[];
  public popularity: number;
  public release_date: string;
  public video: boolean;
  public vote_average: number;
  public vote_count: number;

  constructor() {
    this.adult = false;
    this.backdrop_path = '';
    this.id = 0;
    this.title = '';
    this.original_language = '';
    this.original_title = '';
    this.overview = '';
    this.poster_path = '';
    this.media_type = '';
    this.genre_ids = [];
    this.popularity = 0;
    this.release_date = '';
    this.video = false;
    this.vote_average = 0;
    this.vote_count = 0;
  }
}
