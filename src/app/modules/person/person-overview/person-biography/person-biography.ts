import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Person } from '../../../../classes/person';

@Component({
  selector: 'app-person-biography',
  standalone: false,
  templateUrl: './person-biography.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-biography.scss',
})
export class PersonBiography {

  public person: InputSignal<Person> = input.required<Person>();

}
