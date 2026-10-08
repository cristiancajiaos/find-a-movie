import { OrderCriteria } from "../../interfaces/order-criteria";

export class PersonCreditsQuery {
  public order: string;
  public roles: string[];
  public fromYear: number;
  public toYear: number;

  constructor() {
    this.order = null;
    this.roles = [];
    this.fromYear = null;
    this.toYear = null;
  }
}
