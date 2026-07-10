import { Component, OnInit, ChangeDetectionStrategy, WritableSignal, signal } from '@angular/core';
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

  public enableBorderRadius: WritableSignal<boolean> = signal(true);
  public dropdownMenuEnd: WritableSignal<boolean> = signal(false);

  public movieIcon: IconDefinition = faFilm;

  ngOnInit(): void {
  }
}
