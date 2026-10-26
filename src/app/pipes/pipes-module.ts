import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuntimePipe } from './runtime-pipe';
import { SafeUrlPipe } from './safe-url-pipe';
import { SortCastMemberByPipe } from './sort-cast-member-by.pipe';
import { SortCrewMemberByPipe } from './sort-crew-member-by.pipe';
import { SortPersonCastCreditsByPipe } from './sort-person-cast-credits-by.pipe';
import { SortPersonCrewCreditsByPipe } from './sort-person-crew-credits-by.pipe';
import { SortProductionCompaniesByNamePipe } from './sort-production-companies-by-name.pipe';
import { SortProductionCountriesByNamePipe } from './sort-production-countries-by-name.pipe';
import { SortGenresByNamePipe } from './sort-genres-by-name.pipe';
import { SortLanguagesByNamePipe } from './sort-languages-by-name.pipe';
import { SortCrewMembersByLastNamePipe } from './sort-crew-members-by-last-name.pipe';

@NgModule({
  declarations: [
    RuntimePipe,
    SafeUrlPipe,
    SortCastMemberByPipe,
    SortCrewMemberByPipe,
    SortPersonCastCreditsByPipe,
    SortPersonCrewCreditsByPipe,
    SortProductionCompaniesByNamePipe,
    SortProductionCountriesByNamePipe,
    SortGenresByNamePipe,
    SortLanguagesByNamePipe,
    SortCrewMembersByLastNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RuntimePipe,
    SafeUrlPipe,
    SortCastMemberByPipe,
    SortCrewMemberByPipe,
    SortPersonCastCreditsByPipe,
    SortPersonCrewCreditsByPipe,
    SortProductionCompaniesByNamePipe,
    SortProductionCountriesByNamePipe,
    SortGenresByNamePipe,
    SortLanguagesByNamePipe,
    SortCrewMembersByLastNamePipe
  ]
})
export class PipesModule { }
