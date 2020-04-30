import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { SearchResult } from 'src/app/interfaces/search-result';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-view-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchViewComponent implements OnInit {
  @Input() searchInput: string;
  searchResults: SearchResult[] = [];
  faSpinner: IconDefinition;
  loadingSearch = false;
  triggerSearch = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private imageService: ImageService
  ) {
    this.faSpinner = faSpinner;
  }

  ngOnInit() {
    this.searchInput = '';

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.query) {
        this.searchInput = params.query;
        this.getMovieResults(this.searchInput);
        this.triggerSearch = true;
      }
    });
  }

  submitQuery(str) {
    this.triggerSearch = true;
    this.getMovieResults(str);
  }

  getMovieResults(str): void {
    this.loadingSearch = true;

    this.movieService.searchMovies(str).subscribe(pageResult => {
      this.searchResults = pageResult.results.map(element => {
        return {
          title: element.title,
          backdrop_path: element.backdrop_path,
          release_date: element.release_date,
          id: element.id,
          vote_average: element.vote_average
        };
      });

      console.log(this.searchResults);
      this.loadingSearch = false;
    });
  }

  getBackdropImage(str): string {
    return `url(${this.imageService.buildBackdropImage(str)})`;
  }

}
