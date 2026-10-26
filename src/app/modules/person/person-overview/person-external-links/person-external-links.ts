import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Person } from '../../../../classes/person';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-person-external-links',
  standalone: false,
  templateUrl: './person-external-links.html',
  styleUrl: './person-external-links.scss',
})
export class PersonExternalLinks implements OnChanges {
  public person: InputSignal<Person> = input.required<Person>();

  public externalLinksTitle: WritableSignal<string> = signal('External Links');

  public imdbIcon: IconDefinition = faImdb;
  public viewIMDBText: WritableSignal<string> = signal('View IMDB');
  public personIMDBUrl: WritableSignal<string> = signal('');

  public globeIcon: IconDefinition = faGlobe;
  public viewHomepageText: WritableSignal<string> = signal('View Homepage');
  public personHomepageUrl: WritableSignal<string> = signal('');

  ngOnChanges(changes: SimpleChanges): void {
    this.setPersonExternaLinks();
  }

  private setPersonExternaLinks(): void {
    if (this.person().imdb_id) {
      this.personIMDBUrl.set(`${environment.imdbPersonUrl}${this.person().imdb_id}`);
    }
    if (this.person().homepage) {
      this.personHomepageUrl.set(`${this.person().homepage}`);
    }
  }
}
