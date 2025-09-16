import { ResponseVideoResult } from "./response-video/response-video-result";

export class ResponseVideo {
  public id: number;
  public results: ResponseVideoResult[];

  constructor(){
    this.id = 0;
    this.results = [];
  }
}
