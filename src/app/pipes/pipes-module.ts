import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuntimePipe } from './runtime-pipe';
import { SafeUrlPipe } from './safe-url-pipe';
import { OrderPersonCastCreditsByPipe } from './order-person-cast-credits-by.pipe';
import { OrderPersonCrewCreditsByPipe } from './order-person-crew-credits-by-pipe';
import { OrderCrewMembersByLastNamePipe } from './order-crew-members-by-last-name.pipe';
import { OrderGenresByNamePipe } from './order-genres-by-name.pipe';
import { OrderLanguagesByNamePipe } from './order-languages-by-name.pipe';
import { SortCastMemberByPipe } from './sort-cast-member-by.pipe';
import { SortCrewMemberByPipe } from './sort-crew-member-by.pipe';
import { SortPersonCastCreditsByPipe } from './sort-person-cast-credits-by.pipe';
import { SortPersonCrewCreditsByPipe } from './sort-person-crew-credits-by.pipe';
import { SortProductionCompaniesByNamePipe } from './sort-production-companies-by-name.pipe';
import { SortProductionCountriesByNamePipe } from './sort-production-countries-by-name.pipe';

@NgModule({
  declarations: [
    RuntimePipe,
    SafeUrlPipe,
    OrderPersonCastCreditsByPipe,
    OrderPersonCrewCreditsByPipe,
    OrderCrewMembersByLastNamePipe,
    OrderGenresByNamePipe,
    OrderLanguagesByNamePipe,
    SortCastMemberByPipe,
    SortCrewMemberByPipe,
    SortPersonCastCreditsByPipe,
    SortPersonCrewCreditsByPipe,
    SortProductionCompaniesByNamePipe,
    SortProductionCountriesByNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RuntimePipe,
    SafeUrlPipe,
    OrderPersonCastCreditsByPipe,
    OrderPersonCrewCreditsByPipe,
    OrderCrewMembersByLastNamePipe,
    OrderGenresByNamePipe,
    OrderLanguagesByNamePipe,
    SortCastMemberByPipe,
    SortCrewMemberByPipe,
    SortPersonCastCreditsByPipe,
    SortPersonCrewCreditsByPipe,
    SortProductionCompaniesByNamePipe,
    SortProductionCountriesByNamePipe
  ]
})
export class PipesModule { }
