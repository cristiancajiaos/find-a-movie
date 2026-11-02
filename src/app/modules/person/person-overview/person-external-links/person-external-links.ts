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
import { faFacebook, faImdb, faInstagram, faTiktok, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../../../environments/environment.development';
import { PersonExternalIds } from '../../../../classes/person-external-ids';
import { ExternalLinkHelper } from '../../../../helpers/external-link-helper';

@Component({
  selector: 'app-person-external-links',
  standalone: false,
  templateUrl: './person-external-links.html',
  styleUrl: './person-external-links.scss',
})
export class PersonExternalLinks implements OnChanges {
  public person: InputSignal<Person> = input.required<Person>();
  public personExternalIds: InputSignal<PersonExternalIds> = input.required<PersonExternalIds>();

  public externalLinksTitle: WritableSignal<string> = signal('External Links');

  public imdbIcon: IconDefinition = faImdb;
  public viewIMDBText: WritableSignal<string> = signal('IMDB Profile');
  public personIMDBUrl: WritableSignal<string> = signal('');

  public globeIcon: IconDefinition = faGlobe;
  public viewHomepageText: WritableSignal<string> = signal('Official website');
  public personHomepageUrl: WritableSignal<string> = signal('');

  public facebookIcon: IconDefinition = faFacebook;
  public viewFacebookText: WritableSignal<string> = signal('Official Facebook Profile');
  public personFacebookUrl: WritableSignal<string> = signal('');

  public instagramIcon: IconDefinition = faInstagram;
  public viewInstagramText: WritableSignal<string> = signal('Official Instagram Profile');
  public personInstagramUrl: WritableSignal<string> = signal('');

  public twitterIcon: IconDefinition = faXTwitter;
  public viewTwitterText: WritableSignal<string> = signal('Official X (formerly Twitter) Profile');
  public personTwitterUrl: WritableSignal<string> = signal('');

  public tiktokIcon: IconDefinition = faTiktok;
  public viewTiktokText: WritableSignal<string> = signal('Official TikTok Profile');
  public personTiktokUrl: WritableSignal<string> = signal('');

  public youtubeIcon: IconDefinition = faYoutube;
  public viewYoutubeText: WritableSignal<string> = signal('Official YouTube Channel');
  public personYoutubeUrl: WritableSignal<string> = signal('');

  private externalLinkHelper = new ExternalLinkHelper();

  ngOnChanges(changes: SimpleChanges): void {
    this.setPersonExternalLinks();
  }

  private setPersonExternalLinks(): void {
    if (this.person().imdb_id) {
      this.personIMDBUrl.set(`${environment.imdbPersonUrl}${this.person().imdb_id}`);
    }
    if (this.person().homepage) {
      this.personHomepageUrl.set(`${this.person().homepage}`);
    }
    if (this.personExternalIds().facebook_id) {
      this.personFacebookUrl.set(this.externalLinkHelper.setFacebookPage(this.personExternalIds().facebook_id));
    }
    if (this.personExternalIds().instagram_id) {
      this.personInstagramUrl.set(this.externalLinkHelper.setInstagramPage(this.personExternalIds().instagram_id));
    }
    if (this.personExternalIds().twitter_id) {
      this.personTwitterUrl.set(this.externalLinkHelper.setTwitterPage(this.personExternalIds().twitter_id));
    }
    if (this.personExternalIds().tiktok_id) {
      this.personTiktokUrl.set(this.externalLinkHelper.setTiktokPage(this.personExternalIds().tiktok_id));
    }
    if (this.personExternalIds().youtube_id) {
      this.personYoutubeUrl.set(this.externalLinkHelper.setYouTubePage(this.personExternalIds().youtube_id));
    }
  }
}
