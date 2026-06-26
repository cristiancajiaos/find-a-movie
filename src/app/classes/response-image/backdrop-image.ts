export class BackdropImage {
  public aspect_ratio: number;
  public height: number;
  public iso_3166_1: string | null;
  public iso_639_1: string | null;
  public file_path: string;
  public vote_average: number;
  public vote_count: number;
  public width: number;

  constructor() {
    this.aspect_ratio = 0;
    this.height = 0;
    this.iso_3166_1 = '';
    this.iso_639_1 = '';
    this.file_path = '';
    this.vote_average = 0;
    this.vote_count = 0;
    this.width = 0;
  }
}
