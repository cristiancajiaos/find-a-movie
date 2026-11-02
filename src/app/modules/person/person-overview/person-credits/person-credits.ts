import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Person } from '../../../../classes/person';
import { ResponsePersonCastCredit } from '../../../../classes/person-movie-credits/response-person-cast-credit';
import { ResponsePersonCrewCredit } from '../../../../classes/person-movie-credits/response-person-crew-credit';

@Component({
  selector: 'app-person-credits',
  standalone: false,
  templateUrl: './person-credits.html',
  styleUrl: './person-credits.scss',
})
export class PersonCredits {

  public person: InputSignal<Person> = input.required<Person>();
  public personCastCredits: InputSignal<ResponsePersonCastCredit[]> = input.required<ResponsePersonCastCredit[]>();
  public personCrewCredits: InputSignal<ResponsePersonCrewCredit[]> = input.required<ResponsePersonCrewCredit[]>();

  public creditsTitle: WritableSignal<string> = signal('Credits');
  public byCastTitle: WritableSignal<string> = signal('Some Credits By Cast');
  public byCrewTitle: WritableSignal<string> = signal('Some Credits By Crew');
  public noCastCredits: WritableSignal<string> = signal('This person has no acting roles in movies.');
  public noCrewCredits: WritableSignal<string> = signal('This person has no technical or production roles in movies.');
  public viewCastCreditsText: WritableSignal<string> = signal('View All Cast Credits');
  public viewCrewCreditsText: WritableSignal<string> = signal('View All Crew Credits');
}
