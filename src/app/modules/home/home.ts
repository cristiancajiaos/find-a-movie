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

  ngOnInit(): void {
    this.titleService.setDefaultTitle();
  }

}
