import { Component } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-person',
  standalone: false,
  templateUrl: './home-person.html',
  styleUrl: './home-person.scss',
})
export class HomePerson {

  public bgImage: string = 'img/bg/search-main-bg-2.jpg';

  public userIcon: IconDefinition = faUser;

}
