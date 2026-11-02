export class PersonExternalIds {
  public id: number;
  public freebase_mid: string;
  public freebase_id: string;
  public imdb_id: string;
  public tvrage_id: number;
  public wikidata_id: string;
  public facebook_id: string;
  public instagram_id: string;
  public tiktok_id: string;
  public twitter_id: string;
  public youtube_id: string;

  constructor() {
    this.id = 0;
    this.freebase_mid = '';
    this.freebase_id = '';
    this.imdb_id = '';
    this.tvrage_id = 0;
    this.wikidata_id = '';
    this.facebook_id = '';
    this.instagram_id = '';
    this.tiktok_id = '';
    this.twitter_id = '';
    this.youtube_id = '';
  }
}
