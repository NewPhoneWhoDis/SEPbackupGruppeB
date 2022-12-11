import { BetsCreationComponent } from './bets-creation/bets-creation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BetsOverviewComponent } from './bets-overview/bets-overview.component';
import { BetsManagementComponent } from './bets-management/bets-management.component';

const routes: Routes = [
  {
    path: 'bets-overview',
    component: BetsOverviewComponent
  },
  {
    path:'bets-creation', 
    component: BetsCreationComponent
  },
  {
    path: 'bets-management',
    component: BetsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BetsRoutingModule { }
