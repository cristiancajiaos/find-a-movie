import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuntimePipe } from './runtime-pipe';
import { SafeUrlPipe } from './safe-url-pipe';
import { OrderCastMemberByPipe } from './order-cast-member-by-pipe';
import { OrderCrewMemberByPipe } from './order-crew-member-by-pipe';
import { OrderPersonCastCreditsByPipe } from './order-person-cast-credits-by.pipe';
import { OrderPersonCrewCreditsByPipe } from './order-person-crew-credits-by-pipe';
import { OrderCrewMembersByLastNamePipe } from './order-crew-members-by-last-name.pipe';

@NgModule({
  declarations: [
    RuntimePipe,
    SafeUrlPipe,
    OrderCastMemberByPipe,
    OrderCrewMemberByPipe,
    OrderPersonCastCreditsByPipe,
    OrderPersonCrewCreditsByPipe,
    OrderCrewMembersByLastNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RuntimePipe,
    SafeUrlPipe,
    OrderCastMemberByPipe,
    OrderCrewMemberByPipe,
    OrderPersonCastCreditsByPipe,
    OrderPersonCrewCreditsByPipe,
    OrderCrewMembersByLastNamePipe
  ]
})
export class PipesModule { }
