import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title-service';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  public filmIcon: IconDefinition = faFilm;

  public welcomeToText: string = 'Welcome to';
  public findAMovieTitle: string = 'Find a Movie';
  public paragraphText: string = 'Search the movies you love, and the people who work in them, all in one place';

  public bgImage: string = 'img/bg/home-bg.png';

  constructor(
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setDefaultTitle();
  }

}
