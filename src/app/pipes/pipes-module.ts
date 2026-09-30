import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuntimePipe } from './runtime-pipe';
import { SafeUrlPipe } from './safe-url-pipe';
import { OrderCastMemberByPipe } from './order-cast-member-by-pipe';
import { OrderCrewMemberByPipe } from './order-crew-member-by-pipe';

@NgModule({
  declarations: [
    RuntimePipe,
    SafeUrlPipe,
    OrderCastMemberByPipe,
    OrderCrewMemberByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RuntimePipe,
    SafeUrlPipe,
    OrderCastMemberByPipe,
    OrderCrewMemberByPipe
  ]
})
export class PipesModule { }
