import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Person } from '../../../../classes/person';

@Component({
  selector: 'app-person-credits',
  standalone: false,
  templateUrl: './person-credits.html',
  styleUrl: './person-credits.scss',
})
export class PersonCredits {

  public person: InputSignal<Person> = input.required<Person>();

  public creditsTitle: WritableSignal<string> = signal('Credits');
  public viewCastCreditsText: WritableSignal<string> = signal('View Cast Credits');
  public viewCrewCreditsText: WritableSignal<string> = signal('View Crew Credits');
}
