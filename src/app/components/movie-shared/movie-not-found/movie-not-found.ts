import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-movie-not-found',
  standalone: false,
  templateUrl: './movie-not-found.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-not-found.scss'
})
export class MovieNotFound {
  public bgImage: string = 'img/bg/bg_generic_1.jpg';
}
