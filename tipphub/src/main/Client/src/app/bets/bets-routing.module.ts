import { BetroundDetailsComponent } from './betround-details/betround-details.component';
import { BetroundParticipantsComponent } from './betround-participants/betround-participants.component';
import { BetsCreationComponent } from './bets-creation/bets-creation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetsOverviewComponent } from './bets-overview/bets-overview.component';
import { BetsManagementComponent } from './bets-management/bets-management.component';
import {GameTableBetsComponent} from "../components/game-table-bets/game-table-bets.component";
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";

const routes: Routes = [
  {
    path: 'bets-overview',
    component: BetsOverviewComponent
  },
  {
    path: 'betround-details/:id/bets-overview',
    component: BetsOverviewComponent
  },
  {
    path:'bets-creation',
    component: BetsCreationComponent
  },
  {
    path: 'bets-management',
    component: BetsManagementComponent
  },
  {
    path: 'betround-details/:id',
    component: BetroundDetailsComponent
  },
  { path: "betround-details/:id/betTable", component: GameTableBetsComponent },
  {
    path: 'betround-details/:id/scoreboard',
    component: ScoreboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetsRoutingModule { }
