import { Component } from '@angular/core';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-movie',
  standalone: false,
  templateUrl: './home-movie.html',
  styleUrl: './home-movie.scss',
})
export class HomeMovie {

  public bgImage: string = 'img/bg/search-main-bg-1.jpg';

  public movieIcon: IconDefinition = faFilm;

}
