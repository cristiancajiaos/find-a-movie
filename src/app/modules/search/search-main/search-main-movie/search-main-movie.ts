import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main-movie',
  standalone: false,
  templateUrl: './search-main-movie.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-main-movie.scss',
})
export class SearchMainMovie implements OnInit {

  public bgImage: string = 'img/bg/search-main-bg-2.jpg';

  public movieIcon: IconDefinition = faFilm;

  ngOnInit(): void {
  }
}
