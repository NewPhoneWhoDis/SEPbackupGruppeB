import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsCreationComponent } from './bets-creation/bets-creation.component';
import { BetsOverviewComponent } from './bets-overview/bets-overview.component';


@NgModule({
  declarations: [
    BetsCreationComponent,
    BetsOverviewComponent
  ],
  imports: [
    CommonModule,
    BetsRoutingModule
  ]
})
export class BetsModule { }
