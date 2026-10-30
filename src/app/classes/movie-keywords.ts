import { MovieKeyword } from "./movie-keyword/movie-keyword";

export class MovieKeywords {
  public id: number;
  public keywords: MovieKeyword[];

  constructor() {
    this.id = 0;
    this.keywords = [];
  }
}

