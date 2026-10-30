import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy, input, InputSignal, WritableSignal, signal, computed } from '@angular/core';
import { Movie } from '../../../../classes/movie';
import { ProductionCompany } from '../../../../classes/movie/production-company';

@Component({
  selector: 'app-movie-overview-infotable',
  standalone: false,
  templateUrl: './movie-overview-infotable.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movie-overview-infotable.scss',
})
export class MovieOverviewInfotable implements OnChanges {

  public movieInfoTitle: WritableSignal<string> = signal('Movie Info');

  public originalTitleText: WritableSignal<string> = signal('Original Title:');

  public genreText = computed(() => {
    return this.movie().genres.length > 1 ? 'Genres:' : 'Genre:';
  });

  public allProductionCompanies: WritableSignal<ProductionCompany[]> = signal([]);
  public productionCompanyText = computed(() => {
    return this.allProductionCompanies().length > 1 ? 'Production Companies:' : 'Production Company:';
  });

  public productionCountryText = computed(() => {
    return this.movie().production_countries.length > 1 ? 'Production Countries:' : 'Production Country:';
  });

  public languageText = computed(() => {
    return this.movie().spoken_languages.length > 1 ? 'Languages:' : 'Language:';
  });

  public releaseDateText: WritableSignal<string> = signal('Release Date:');
  public movieReleaseDate: WritableSignal<Date> = signal(new Date());

  public runtimeText: WritableSignal<string> = signal('Runtime:');

  public budgetText: WritableSignal<string> = signal('Budget:');
  public usdText: WritableSignal<string> = signal('USD');
  public boxOfficeText: WritableSignal<string> = signal('Box Office:');

  movie: InputSignal<Movie> = input.required<Movie>();

  ngOnChanges(changes: SimpleChanges): void {
    this.setProductionCompanies();
    this.setReleaseDate();
  }

  private setProductionCompanies() {
    this.movie().production_companies.forEach(productionCompany => {
      if (!this.allProductionCompanies().map(productionCompany => productionCompany.name).includes(productionCompany.name)) {
        this.allProductionCompanies.update((productionCompanies) => {
          return [...productionCompanies, productionCompany]
        });
      }
    });
  }

  private setReleaseDate(): void {
    if (this.movie().release_date) {
      this.movieReleaseDate.set(new Date(this.movie().release_date));
    }
  }
}
