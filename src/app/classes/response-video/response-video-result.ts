export class ResponseVideoResult {
  public iso_639_1: string;
  public iso_3166_1: string;
  public name: string;
  public key: string;
  public site: string;
  public size: number;
  public type: string;
  public official: boolean;
  public published_at: string;
  public id: string;

  constructor() {
    this.iso_639_1 = '';
    this.iso_3166_1 = '';
    this.name = '';
    this.key = '';
    this.site = '';
    this.size = 0;
    this.type = '';
    this.official = false;
    this.published_at = '';
    this.id = '';
  }
}
