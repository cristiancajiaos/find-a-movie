import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private title: Title
  ) {}

  public setDefaultTitle(): void {
    this.title.setTitle('Find a Movie');
  }

  public setTitle(title: string): void {
    this.title.setTitle(`${title} | Find a Movie`);
  }

}
