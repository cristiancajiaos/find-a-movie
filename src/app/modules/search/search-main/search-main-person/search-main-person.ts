import { Component, ChangeDetectionStrategy, WritableSignal, signal, OnInit } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main-person',
  standalone: false,
  templateUrl: './search-main-person.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-main-person.scss',
})
export class SearchMainPerson implements OnInit {

  public bgImage: WritableSignal<string> = signal('img/bg/search-main-bg-1.jpg');
  public styleBg: WritableSignal<Object> = signal({});

  public enableBorderRadius: WritableSignal<boolean> = signal(true);
  public dropdownMenuEnd: WritableSignal<boolean> = signal(false);

  public userIcon: IconDefinition = faUser;

  public searchPersonText: WritableSignal<string> = signal('Search a Person');

  ngOnInit(): void {
    this.styleBg.set({
      'background-image': `url(${this.bgImage()})`
    });
  }

}
