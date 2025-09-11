export class Person {
  public adult: boolean;
  public also_known_as: string[];
  public biography: string;
  public birthday: string | null;
  public deathday: string | null;
  public gender: number;
  public homepage: string | null;
  public id: number;
  public imdb_id: string;
  public known_for_department: string;
  public name: string;
  public place_of_birth: string;
  public popularity: number;
  public profile_path: string;

  constructor() {
    this.adult = false;
    this.also_known_as = [];
    this.biography = '';
    this.birthday = '';
    this.deathday = '';
    this.gender = 1;
    this.homepage = null;
    this.id = 0;
    this.imdb_id = '';
    this.known_for_department = '';
    this.name = '';
    this.place_of_birth = '';
    this.popularity = 0;
    this.profile_path = '';
  }
}
