import { Component, signal, WritableSignal } from '@angular/core';
import { Writable } from 'stream';

@Component({
  selector: 'app-person-nav',
  standalone: false,
  templateUrl: './person-nav.html',
  styleUrl: './person-nav.scss',
})
export class PersonNav {

  public overviewMenu: WritableSignal<string> = signal('Overview');
  public castCreditsMenu: WritableSignal<string> = signal('Cast Credits');
  public crewCreditsMenu: WritableSignal<string> = signal('Crew Credits');
}
