import {
  Component,
  input,
  InputSignal,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { faFacebook, faImdb, faInstagram, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../../../classes/movie';
import { MovieExternalIds } from '../../../../classes/movie-external-ids';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-movie-overview-external-links',
  standalone: false,
  templateUrl: './movie-overview-external-links.html',
  styleUrl: './movie-overview-external-links.scss',
})
export class MovieOverviewExternalLinks implements OnChanges {
  public externalLinksTitle: WritableSignal<string> = signal('External Links');

  public movieImdb: WritableSignal<string> = signal('');
  public imdbIcon: IconDefinition = faImdb;
  public imdbText: WritableSignal<string> = signal('IMDB');

  public movieOfficialWebsite: WritableSignal<string> = signal('');
  public globeIcon: IconDefinition = faGlobe;
  public officialWebsiteText: WritableSignal<string> = signal('Official website');

  public facebookOfficialPage: WritableSignal<string> = signal('');
  public facebookIcon: IconDefinition = faFacebook;
  public facebookPageText: WritableSignal<string> = signal('Official Facebook Page');

  public instagramOfficialPage: WritableSignal<string> = signal('');
  public instagramIcon: IconDefinition = faInstagram;
  public instagramPageText: WritableSignal<string> = signal('Official Instagram Page');

  public twitterOfficialPage: WritableSignal<string> = signal('');
  public twitterIcon: IconDefinition = faXTwitter;
  public twitterPageText: WritableSignal<string> = signal('Official X (formerly Twitter) Page');

  movie: InputSignal<Movie> = input.required<Movie>();
  movieExternalIds: InputSignal<MovieExternalIds> = input.required<MovieExternalIds>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setMovieIMDB();
    this.setMovieOfficialWebsite();
    this.setFacebookPage();
    this.setInstagramPage();
    this.setTwitterPage();
  }

  private setMovieIMDB(): void {
    if (this.movie().imdb_id) {
      this.movieImdb.set(`${environment.imdbMovieUrl}${this.movie().imdb_id}/`);
    }
  }

  private setMovieOfficialWebsite(): void {
    if (this.movie().homepage) {
      this.movieOfficialWebsite.set(`${this.movie().homepage}`);
    }
  }

  private setFacebookPage(): void {
    if (this.movieExternalIds().facebook_id) {
      this.facebookOfficialPage.set(`${environment.facebookUrl}${this.movieExternalIds().facebook_id}`);
    }
  }

  private setInstagramPage(): void {
    if (this.movieExternalIds().instagram_id) {
      this.instagramOfficialPage.set(`${environment.instagramUrl}${this.movieExternalIds().instagram_id}`);
    }
  }

  private setTwitterPage(): void {
    if (this.movieExternalIds().twitter_id) {
      this.twitterOfficialPage.set(`${environment.twitterUrl}${this.movieExternalIds().twitter_id}`);
    }

  }
}
