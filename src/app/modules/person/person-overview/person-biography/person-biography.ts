import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from '../../../../classes/person';

@Component({
  selector: 'app-person-biography',
  standalone: false,
  templateUrl: './person-biography.html',
  styleUrl: './person-biography.scss',
})
export class PersonBiography implements OnChanges {

  @Input() person: Person = null;

  public personBiography: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.setPersonBiography();
  }

  private setPersonBiography(): void {
    this.personBiography = this.person.biography;
  }

}
