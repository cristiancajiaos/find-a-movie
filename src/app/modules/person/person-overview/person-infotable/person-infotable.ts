import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from '../../../../classes/person';
import {
  faCircleQuestion,
  faGlobe,
  faMars,
  faVenus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-person-infotable',
  standalone: false,
  templateUrl: './person-infotable.html',
  styleUrl: './person-infotable.scss',
})
export class PersonInfotable implements OnChanges {
  @Input() person: Person = null;

  public maleIcon: IconDefinition = faMars;
  public femaleIcon: IconDefinition = faVenus;
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;
  public questionIcon: IconDefinition = faCircleQuestion;

  public personAlsoKnownAs: string[] = [];
  public personBirthDay?: Date;
  public personDeathDay?: Date;
  public personPlaceBirth: string = '';
  public personGender: string = '';
  public personGenderIcon?: IconDefinition;
  public personMainOccupation: string = '';
  public personIMDBUrl: string = '';
  public personHomepageUrl: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.setPersonInfotable();
  }

  private setPersonInfotable(): void {
    if (this.person.also_known_as.length > 0) {
      this.personAlsoKnownAs = this.person.also_known_as;
    }
    if (this.person.birthday) {
      this.personBirthDay = new Date(this.person.birthday);
    }
    if (this.person.place_of_birth) {
      this.personPlaceBirth = this.person.place_of_birth;
    }
    if (this.person.deathday) {
      this.personDeathDay = new Date(this.person.deathday);
    }
    if (this.person.known_for_department) {
      this.personMainOccupation = this.person.known_for_department;
    }
    if (this.person.imdb_id) {
      this.personIMDBUrl = `${environment.imdbPersonUrl}${this.person.imdb_id}`;
    }
    if (this.person.homepage) {
      this.personHomepageUrl = `${this.person.homepage}`;
    }
  }
}
