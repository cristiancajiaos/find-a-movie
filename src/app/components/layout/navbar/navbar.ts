import { Component, OnInit } from '@angular/core';
import { faF, faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  public filmIcon: IconDefinition = faFilm;
  
  ngOnInit(): void {

  }
}
