import { Genre } from "./movie/genre";
import { SpokenLanguage } from "./movie/spoken-language";

export class Movie {
  public adult: boolean;
  public backdrop_path: string;
  public belongs_to_collection: boolean | null;
  public budget: number;
  public genres: Genre[];
  public homepage: string;
  public id: number;
  public imdb_id: string;
  public origin_country: string[];
  public original_language: string;
  public original_title: string;
  public overview: string;
  public popularity: number;
  public poster_path: string;
  public release_date: string;
  public revenue: number;
  public runtime: number;
  public spoken_languages: SpokenLanguage[];
  public status: string;
  public tagline: string;
  public title: string;
  public video: boolean;
  public vote_average: number;
  public vote_count: number;

  constructor() {
    this.adult = false;
    this.backdrop_path = '';
    this.belongs_to_collection = false;
    this.budget = 0;
    this.genres = [];
    this.homepage = '';
    this.id = 0;
    this.imdb_id = '';
    this.origin_country = [];
    this.original_language = '';
    this.original_title = '';
    this.overview = '';
    this.popularity = 0;
    this.poster_path = '';
    this.release_date = '';
    this.revenue = 0;
    this.runtime = 0;
    this.spoken_languages = [];
    this.status = '';
    this.tagline = '';
    this.title = '';
    this.video = false;
    this.vote_average = 0;
    this.vote_count = 0;
  }
}
