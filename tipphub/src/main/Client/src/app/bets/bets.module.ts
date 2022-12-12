import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetroundFilterPipePipe } from '../Pipes/betround-filter-pipe.pipe';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsCreationComponent } from './bets-creation/bets-creation.component';
import { BetsOverviewComponent } from './bets-overview/bets-overview.component';
import { BetsManagementComponent } from './bets-management/bets-management.component';


@NgModule({
  declarations: [
    BetsCreationComponent,
    BetsOverviewComponent,
    BetsManagementComponent,
    BetroundFilterPipePipe
  ],
  imports: [
    CommonModule,
    BetsRoutingModule,
    FormsModule
  ]
})
export class BetsModule { }