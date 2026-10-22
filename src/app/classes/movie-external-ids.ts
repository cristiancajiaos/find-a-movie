export class MovieExternalIds {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;

  constructor() {
    this.id = 0;
    this.imdb_id = null;
    this.wikidata_id = null;
    this.facebook_id = null;
    this.instagram_id = null;
    this.twitter_id = null;
  }
}
