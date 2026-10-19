import { ChangeDetectionStrategy, Component, input, InputSignal, OnChanges, signal, SimpleChanges, WritableSignal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-infotable.scss',
})
export class PersonInfotable implements OnChanges {

  public generalInformationTitle: WritableSignal<string> = signal('General Information');

  public bornTable: WritableSignal<string> = signal('Born:');
  public bornInTable: WritableSignal<string> = signal('in');
  public personBirthDay: WritableSignal<Date> = signal(null);

  public diedTable: WritableSignal<string> = signal('Died:');
  public personDeathDay: WritableSignal<Date> = signal(null);

  public genderTable: WritableSignal<string> = signal('Gender:');
  public femaleIcon: IconDefinition = faVenus;
  public femaleTable: WritableSignal<string> = signal('Female');
  public maleIcon: IconDefinition = faMars;
  public maleTable: WritableSignal<string> = signal('Male');
  public questionIcon: IconDefinition = faCircleQuestion;
  public unknownTable: WritableSignal<string> = signal('?');

  public mainOccupationTable: WritableSignal<string> = signal('Main occupation:');

  public alsoKnownAsTable: WritableSignal<string> = signal('Also known as:');

  public imdbIcon: IconDefinition = faImdb;
  public viewIMDBText: WritableSignal<string> = signal('View IMDB');
  public personIMDBUrl: WritableSignal<string> = signal('');

  public globeIcon: IconDefinition = faGlobe;
  public viewHomepageText: WritableSignal<string> = signal('View Homepage');
  public personHomepageUrl: WritableSignal<string> = signal('');

  public person: InputSignal<Person> = input.required<Person>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setPersonInfotable();
  }

  private setPersonInfotable(): void {
    if (this.person().birthday) {
      this.personBirthDay.set(new Date(this.person().birthday));
    }
    if (this.person().deathday) {
      this.personDeathDay.set(new Date(this.person().deathday));
    }
    if (this.person().imdb_id) {
      this.personIMDBUrl.set(`${environment.imdbPersonUrl}${this.person().imdb_id}`);
    }
    if (this.person().homepage) {
      this.personHomepageUrl.set(`${this.person().homepage}`);
    }
  }
}
