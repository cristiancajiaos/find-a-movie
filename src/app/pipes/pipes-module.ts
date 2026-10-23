import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuntimePipe } from './runtime-pipe';
import { SafeUrlPipe } from './safe-url-pipe';
import { OrderPersonCastCreditsByPipe } from './order-person-cast-credits-by.pipe';
import { OrderPersonCrewCreditsByPipe } from './order-person-crew-credits-by-pipe';
import { OrderCrewMembersByLastNamePipe } from './order-crew-members-by-last-name.pipe';
import { OrderGenresByNamePipe } from './order-genres-by-name.pipe';
import { OrderProductionCompaniesByNamePipe } from './order-production-companies-by-name.pipe';
import { OrderProductionCountriesByNamePipe } from './order-production-countries-by-name.pipe';
import { OrderLanguagesByNamePipe } from './order-languages-by-name.pipe';
import { SortCastMemberByPipe } from './sort-cast-member-by.pipe';
import { SortCrewMemberByPipe } from './sort-crew-member-by.pipe';
import { SortPersonCastCreditsByPipe } from './sort-person-cast-credits-by.pipe';
import { SortPersonCrewCreditsByPipe } from './sort-person-crew-credits-by.pipe';

@NgModule({
  declarations: [
    RuntimePipe,
    SafeUrlPipe,
    OrderPersonCastCreditsByPipe,
    OrderPersonCrewCreditsByPipe,
    OrderCrewMembersByLastNamePipe,
    OrderGenresByNamePipe,
    OrderProductionCompaniesByNamePipe,
    OrderProductionCountriesByNamePipe,
    OrderLanguagesByNamePipe,
    SortCastMemberByPipe,
    SortCrewMemberByPipe,
    SortPersonCastCreditsByPipe,
    SortPersonCrewCreditsByPipe
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
    OrderProductionCompaniesByNamePipe,
    OrderProductionCountriesByNamePipe,
    OrderLanguagesByNamePipe,
    SortCastMemberByPipe,
    SortCrewMemberByPipe,
    SortPersonCastCreditsByPipe,
    SortPersonCrewCreditsByPipe
  ]
})
export class PipesModule { }
