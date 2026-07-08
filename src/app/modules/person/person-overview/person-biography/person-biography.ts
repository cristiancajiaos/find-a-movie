import { Component, input } from '@angular/core';
import { Person } from '../../../../classes/person';

@Component({
  selector: 'app-person-biography',
  standalone: false,
  templateUrl: './person-biography.html',
  styleUrl: './person-biography.scss',
})
export class PersonBiography {

  public person = input.required<Person>();

}
