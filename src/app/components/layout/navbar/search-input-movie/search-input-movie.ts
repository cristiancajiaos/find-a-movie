import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faList, faMagnifyingGlass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMovieResult } from '../../../../classes/response-search-movie/response-movie-result';
import { SearchService } from '../../../../services/search-service';
import { debounceTime, finalize, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-input-movie',
  standalone: false,
  templateUrl: './search-input-movie.html',
  styleUrl: './search-input-movie.scss'
})
export class SearchInputMovie implements OnInit, OnDestroy {

  private router = inject(Router);
  private searchService = inject(SearchService);

  public searchIcon: IconDefinition = faMagnifyingGlass;
  public resultsIcon: IconDefinition = faList;

  public originalMovieResults: ResponseMovieResult[] = [];
  public movieResults: ResponseMovieResult[] = [];

  @Input() enableBorderRadius: boolean = false;
  @Input() dropdownMenuEnd: boolean = true;
  public movieInput: FormControl = new FormControl('');
  public placeholder: string = 'Eg. Star Wars';
  public ariaLabel: string = 'Search Movie';
  @ViewChild('searchMovieInput') searchMovieInput: ElementRef;

  @ViewChild('movieSearchDropdown') movieSearchDropdown: NgbDropdown;

  private movieResultsSubscription: Subscription;

  ngOnInit(): void {
    this.listenMovieInputChanges();
  }

  public listenMovieInputChanges(): void {
    this.movieResultsSubscription = this.movieInput.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((movieInput) => {
          return this.searchService.searchMovieInput(movieInput);
        }),
        finalize (() => {
        }),
      )
      .subscribe((results) => {
        this.originalMovieResults = results;
        this.movieResults = results.slice(0, 5);
        this.showMovieDropdownBasedOnMovieInput();
      });
  }

  public showMovieDropdownBasedOnMovieInput() {
    const inputValue: string = this.movieInput.value;
    if (inputValue.length >= 2) {
      this.openMovieSearchDropdown();
    } else {
      this.closeMovieSearchDropdown();
    }
  }

  public processMovieSearch(): void {
    this.searchMovieInput.nativeElement.blur();
    const searchQuery: string = this.movieInput.value;
    if (searchQuery.length == 0) {
      return;
    }
    this.router.navigate(['search', 'movie', searchQuery]);
    this.closeMovieSearchDropdown();
  }

  public toggleMovieSearchDropdownBySearch(): void {
    this.closeMovieSearchDropdown();
  }

  public toggleMovieSearchDropdownByFocus(): void {
    if (this.movieResults.length > 0) {
      this.openMovieSearchDropdown();
    }
  }

  public closeMovieSearchDropdownByBlur(): void {
    this.closeMovieSearchDropdown();
  }

  public openMovieSearchDropdown(): void {
    this.movieSearchDropdown.open();
  }

  public closeMovieSearchDropdown(): void {
    this.movieSearchDropdown.close();
  }

  public toggleMovieSearchDropdown(): void {
    this.movieSearchDropdown.toggle();
  }

  public goToMovieClose(value: boolean): void {
    this.closeMovieSearchDropdown();
  }

  ngOnDestroy(): void {
    if (this.movieResultsSubscription) {
      this.movieResultsSubscription.unsubscribe();
    }
  }
}
