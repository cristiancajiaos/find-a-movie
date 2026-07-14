import { Component, OnInit, ChangeDetectionStrategy, WritableSignal, signal } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-main-person',
  standalone: false,
  templateUrl: './search-main-person.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-main-person.scss',
})
export class SearchMainPerson {

  public bgImage: string = 'img/bg/search-main-bg-1.jpg';

  public enableBorderRadius: WritableSignal<boolean> = signal(true);
  public dropdownMenuEnd: WritableSignal<boolean> = signal(false);

  public userIcon: IconDefinition = faUser;

}
