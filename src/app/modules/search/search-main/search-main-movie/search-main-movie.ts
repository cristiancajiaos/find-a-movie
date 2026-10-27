import { Component, ChangeDetectionStrategy, WritableSignal, signal, OnInit } from '@angular/core';
import { faFilm, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main-movie',
  standalone: false,
  templateUrl: './search-main-movie.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-main-movie.scss',
})
export class SearchMainMovie implements OnInit {

  public bgImage: WritableSignal<string> = signal('img/bg/search-main-bg-2.jpg');
  public styleBg: WritableSignal<Object> = signal({});

  public enableBorderRadius: WritableSignal<boolean> = signal(true);
  public dropdownMenuEnd: WritableSignal<boolean> = signal(false);

  public movieIcon: IconDefinition = faFilm;

  public searchMovieText: WritableSignal<string> = signal('Search a Movie');

  ngOnInit(): void {
    this.styleBg.set({
      'background-image': `url(${this.bgImage()})`
    });
  }

}
