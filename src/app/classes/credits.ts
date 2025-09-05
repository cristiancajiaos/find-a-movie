import { CastMember } from "./cast-member";
import { CrewMember } from "./crew-member";

export class Credits {
  public id: number;
  public cast: CastMember[];
  public crew: CrewMember[];

  constructor() {
    this.id = 0;
    this.cast = [];
    this.crew = [];
  }
}
