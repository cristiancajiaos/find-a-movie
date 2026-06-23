import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Person } from '../../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../../services/person-service';
import {
  faCircleQuestion,
  faGlobe,
  faMars,
  faVenus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-person-overview',
  standalone: false,
  templateUrl: './person-overview.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './person-overview.scss',
})
export class PersonOverview implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private personService = inject(PersonService);
  private titleService = inject(TitleService);
  private loadingService = inject(LoadingService);

  public maleIcon: IconDefinition = faMars;
  public femaleIcon: IconDefinition = faVenus;
  public imdbIcon: IconDefinition = faImdb;
  public globeIcon: IconDefinition = faGlobe;
  public questionIcon: IconDefinition = faCircleQuestion;

  public id: number = 0;

  public person: Person = new Person();

  private personError: HttpErrorResponse = null;
  public personFound: boolean = false;
  public personErrorFound: boolean = false;
  public errorMessage: string = '';

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getPersonSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initPersonOverview();
  }

  private initPersonOverview(): void {
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.person) {
        this.setTitle();
      } else {
        if (this.personError) {
          this.titleService.setPersonServiceErrorTitle();
        }
      }
    });
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id = parseInt(params['id']);
        this.getPerson();
      },
    );
  }

  private getPerson(): void {
    this.personErrorFound = false;

    this.getPersonSubscription = this.personService.getPerson(this.id).subscribe({
      next: (person) => {
        this.person = person;
        this.personFound = true;
      },
      error: (error) => {
        this.handleError(error);
      },
      complete: () => {},
    });
  }

  private setTitle(): void {
    this.titleService.setPersonOverviewTitle(this.person.name);
  }

  private handleError(error: HttpErrorResponse) {
    this.personErrorFound = true;
    this.errorMessage = error.message;
    this.personError = error;
  }

  public reloadOverview(event: boolean): void {
    this.getPerson();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getPersonSubscription) {
      this.getPersonSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
