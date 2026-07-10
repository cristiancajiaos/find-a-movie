import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faFilm, faUser, faBars, faMagnifyingGlass, IconDefinition, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { LightDarkService } from '../../../services/light-dark-service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {

  private lightDarkService = inject(LightDarkService);

  public filmIcon: IconDefinition = faFilm;
  public userIcon: IconDefinition = faUser;
  public barsIcon: IconDefinition = faBars;
  public searchIcon: IconDefinition = faMagnifyingGlass;

  public isMenuCollapsed: boolean = false;
  public searchType: string = 'movie';

  public searchNavbarForm: FormGroup = new FormGroup({});

  public lightIcon: IconDefinition = faSun;
  public darkIcon: IconDefinition = faMoon;

  public isLight: boolean = true;
  public isLight$: Observable<boolean> = this.lightDarkService.isLight;

  public changeLightDarkSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.searchNavbarForm = this.fb.group({
      movieSearch: new FormControl(''),
      personSearch: new FormControl('')
    });
    this.changeLightDarkSubscription = this.isLight$.subscribe({
      next: (status) => {
        this.isLight = status;
      },
      error: (error) => {},
      complete: () => {}
    });
  }

  public toggleCollapse(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  public selectSearchType(searchType: string): void {
    this.searchType = searchType;
  }

  public toggleLightDark() {
    if (this.isLight) {
      this.lightDarkService.changeToDark();
    } else {
      this.lightDarkService.changeToLight();
    }
  }

  ngOnDestroy(): void {
    if (this.changeLightDarkSubscription) {
      this.changeLightDarkSubscription.unsubscribe();
    }
  }
}
