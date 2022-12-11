import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsCreationComponent } from './bets-creation/bets-creation.component';


@NgModule({
  declarations: [
    BetsCreationComponent
  ],
  imports: [
    CommonModule,
    BetsRoutingModule
  ]
})
export class BetsModule { }
