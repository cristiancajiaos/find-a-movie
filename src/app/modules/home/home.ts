import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../services/title-service';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  private titleService = inject(TitleService);

  public filmIcon: IconDefinition = faFilm;

  public welcomeToText: string = 'Welcome to';
  public findAMovieTitle: string = 'Find a Movie';
  public paragraphText: string = 'Search the movies you love, and the people who work in them, all in one place';

  public bgImage: string = 'img/bg/home-bg.jpg';

  ngOnInit(): void {
    this.titleService.setDefaultTitle();
  }

}
