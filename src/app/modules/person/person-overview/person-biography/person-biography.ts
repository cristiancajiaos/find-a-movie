import { ChangeDetectionStrategy, Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
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

  public biographyTitle: WritableSignal<string> = signal('Biography');
  public noBiographyText: WritableSignal<string> = signal('No Biography Available');

}
