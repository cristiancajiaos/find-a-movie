import { OrderCriteria } from "../../interfaces/order-criteria";

export class PersonCreditsQuery {
  public resultsPerPage: number;
  public order: string;
  public roles: string[];
  public fromYear: number;
  public toYear: number;

  constructor() {
    this.resultsPerPage = null;
    this.order = null;
    this.roles = [];
    this.fromYear = null;
    this.toYear = null;
  }
}
