import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private defaultTitle: string = 'Find a Movie';
  constructor(
    private title: Title
  ) {}

  public setDefaultTitle(): void {
    this.title.setTitle(this.defaultTitle);
  }

  public setTitle(title: string): void {
    this.title.setTitle(`${title} | ${this.defaultTitle}`);
  }

  public setMovieOverviewTitle(title: string): void {
    this.title.setTitle(`${title} | ${this.defaultTitle}`);
  }

  public setMovieCastTitle(title: string): void {
    this.title.setTitle(`Cast of ${title} | ${this.defaultTitle}`);
  }

  public setMovieFeaturedCrewTitle(title: string): void {
    this.title.setTitle(`Featured Crew of ${title} | ${this.defaultTitle}`);
  }

  public setMovieFullCrewTitle(title: string): void {
    this.title.setTitle(`Full Crew of ${title} | ${this.defaultTitle}`);
  }



}
