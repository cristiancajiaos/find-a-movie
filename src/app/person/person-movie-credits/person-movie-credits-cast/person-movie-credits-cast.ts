import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsePersonCastCredit } from '../../../classes/person-movie-credits/response-person-cast-credit';
import { LocalStorageService } from '../../../services/local-storage-service';
import { Person } from '../../../classes/person';

@Component({
  selector: 'app-person-movie-credits-cast',
  standalone: false,
  templateUrl: './person-movie-credits-cast.html',
  styleUrl: './person-movie-credits-cast.scss'
})
export class PersonMovieCreditsCast implements OnInit {

  @Input() castCredits: ResponsePersonCastCredit[] = [];

  @ViewChild('starringParagraph') starringParagraph!: ElementRef;
  @ViewChild('castCreditsList') castCreditsList!: ElementRef;

  public loadingPerson: boolean = false;

  public currentPerson!: Person;
  public filterCastCredits: ResponsePersonCastCredit[] = [];

  public page: number = 1;

  constructor(
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.filterCastCredits = structuredClone(this.castCredits);
    this.getPerson();
  }

  private getPerson(): void {
    this.loadingPerson = true;

    this.currentPerson = this.localStorageService.getItem('person');

    if (this.currentPerson) {

    } else {

    }


  }

  public changePage(pageNumber: number) {
    this.page = pageNumber;
    this.starringParagraph.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }



}
