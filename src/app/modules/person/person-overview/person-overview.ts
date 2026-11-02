import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Person } from '../../../classes/person';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from '../../../services/person-service';
import { TitleService } from '../../../services/title-service';
import { LoadingService } from '../../../services/loading-service';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { ResponsePersonCrewCredit } from '../../../classes/person-movie-credits/response-person-crew-credit';
import { ResponsePersonMovieCredits } from '../../../classes/response-person-movie-credits';

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

  public id: WritableSignal<number> = signal(0);

  public person: WritableSignal<Person> = signal(null);
  public personCastCredits: WritableSignal<ResponsePersonCastCredit[]> = signal([]);
  public personCrewCredits: WritableSignal<ResponsePersonCrewCredit[]> = signal([]);

  public personFound: WritableSignal<boolean> = signal(false);
  public personErrorFound: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  private activatedRouteParentSubscription: Subscription = new Subscription();
  private getPersonCreditsSubscription: Subscription = new Subscription();
  private endLoadingSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initPersonOverview();
  }

  private initPersonOverview(): void {
    this.setId();
    this.endLoadingSubscription = this.loadingService.isEndLoading.subscribe((bool) => {
      if (this.person()) {
        this.setTitle();
      } else {
        if (this.personErrorFound()) {
          this.titleService.setPersonServiceErrorTitle();
        }
      }
    });
  }

  private setId(): void {
    this.activatedRouteParentSubscription = this.activatedRoute.parent?.params.subscribe(
      (params) => {
        this.id.set(parseInt(params['id']));
        this.getPersonAndCredits();
      },
    );
  }

  private getPersonAndCredits(): void {
    this.person.set(null);
    this.personCastCredits.set([]);
    this.personCrewCredits.set([]);

    const getPerson: Observable<Person> = this.personService.getPerson(this.id());
    const getCredits: Observable<ResponsePersonMovieCredits> = this.personService.getCredits(this.id());

    this.getPersonCreditsSubscription = forkJoin([
      getPerson,
      getCredits
    ]).subscribe({
      next: ([person, credits]) => {
        this.person.set(person);
        this.personCastCredits.set(credits.cast);
        this.personCrewCredits.set(credits.crew);
        this.personFound.set(true)
      },
      error: (error) => {
        console.error(error);
        this.handleError(error);
      },
      complete: () => {

      }
    });
  }

  private setTitle(): void {
    if (this.person)
    this.titleService.setPersonOverviewTitle(this.person().name);
  }

  private handleError(error: HttpErrorResponse) {
    this.personErrorFound.set(true);
    this.errorMessage.set(error.message);
  }

  public reloadOverview(event: boolean): void {
    this.getPersonAndCredits();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteParentSubscription) {
      this.activatedRouteParentSubscription.unsubscribe();
    }
    if (this.getPersonCreditsSubscription) {
      this.getPersonCreditsSubscription.unsubscribe();
    }
    if (this.endLoadingSubscription) {
      this.endLoadingSubscription.unsubscribe();
    }
  }
}
