import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { MovieResult } from 'src/app/interfaces/movie-result';
import { PageResult } from 'src/app/interfaces/page-result';
import { LiveSearchResult } from 'src/app/interfaces/live-search-result';


@Component({
  selector: "app-form-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchFormComponent implements OnInit {
  faSearch: IconDefinition;
  formCtrl: FormControl;
  @Input() searchInput: string;
  @Output() searchInputChange = new EventEmitter();
  @Output() searchSubmit = new EventEmitter();

  searchOptions: string[] = [];
  movieSearchResults: MovieResult[] = [];
  liveSearchResults: LiveSearchResult[] = [];

  constructor(private movieService: MovieService) {
    this.formCtrl = new FormControl();
    this.movieService = movieService;
  }

  ngOnInit() {
    this.faSearch = faSearch;
  }

  changeInput() {
    this.liveSearchMovies();
  }

  liveSearchMovies() {
    this.movieService.searchMovies(this.searchInput).subscribe((pageResult) => {
      this.movieSearchResults = pageResult.results;
      this.liveSearchResults = this.movieSearchResults
        .map((element) => {
          return {
            title: element.title,
            release_date: element.release_date,
            id: element.id,
          };
        })
        .slice(0, 5);
    });
  }

  onSubmit() {
    console.log('onSubmit');
    this.searchSubmit.emit(this.searchInput);
  }
}
