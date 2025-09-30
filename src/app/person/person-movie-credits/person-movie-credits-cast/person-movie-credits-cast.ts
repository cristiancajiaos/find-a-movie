import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { LocalStorageService } from '../../../services/local-storage-service';
import { Person } from '../../../classes/person';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faGrip, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  styleUrl: './person-movie-credits-cast.scss'
})
export class PersonMovieCreditsCast implements OnInit {

  public gridIcon: IconDefinition = faGrip;
  public listIcon: IconDefinition = faList;

  @Input() castCredits: ResponsePersonCastCredit[] = [];

  @ViewChild('starringParagraph') starringParagraph!: ElementRef;
  @ViewChild('castCreditsList') castCreditsList!: ElementRef;

  public loadingPerson: boolean = false;

  public displayMode: string = 'grid';

  public currentPerson!: Person;
  public filterCastCredits: ResponsePersonCastCredit[] = [];

  public orderCastCreditsForm: FormGroup = new FormGroup({});

  public page: number = 1;

  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.filterCastCredits = structuredClone(this.castCredits);

    this.orderCastCreditsForm = this.fb.group({
      orderCastCredits: new FormControl('1')
    });
    this.getPerson();
  }

  private getPerson(): void {
    this.loadingPerson = true;

    this.currentPerson = this.localStorageService.getItem('person');
  }

  public changeCastCreditsOrder(): void {
    const orderCriteria: string = this.orderCastCreditsForm.controls['orderCastCredits'].value;

    switch(orderCriteria) {
      case '1': {
        this.filterCastCredits.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      }

      case '2': {
        this.filterCastCredits.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
        break;
      }

      case '3': {
        this.filterCastCredits.sort((a, b) => {
          return a.character.localeCompare(b.character);
        });
        break;
      }

      case '4': {
        this.filterCastCredits.sort((a, b) => {
          return b.character.localeCompare(a.character);
        });
        break;
      }

      case '5': {
        this.filterCastCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return aDate.getTime() - bDate.getTime();
        });
        break;
      }

      case '6': {
        this.filterCastCredits.sort((a, b) => {
          const aDate: Date = new Date(a.release_date);
          const bDate: Date = new Date(b.release_date);
          return bDate.getTime() - aDate.getTime();
        });
        break;
      }

      case '7': {
        this.filterCastCredits = structuredClone(this.castCredits);
        break;
      }
    }
  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.starringParagraph.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  public toggleDisplay(display: string) {
    this.displayMode = display
  }

}
