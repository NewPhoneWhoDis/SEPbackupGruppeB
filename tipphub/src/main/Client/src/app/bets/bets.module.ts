import { GroupChatComponent } from './../components/chat/group-chat/group-chat.component';
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BetsRoutingModule } from "./bets-routing.module";
import { BetsCreationComponent } from "./bets-creation/bets-creation.component";
import { BetsOverviewComponent } from "./bets-overview/bets-overview.component";
import { BetsManagementComponent } from "./bets-management/bets-management.component";
import { BetroundParticipantsComponent } from "./betround-participants/betround-participants.component";
import { BetroundDetailsComponent } from "./betround-details/betround-details.component";import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    BetsCreationComponent,
    BetsOverviewComponent,
    BetsManagementComponent,
    BetroundParticipantsComponent,
    BetroundDetailsComponent,
    ScoreboardComponent,
    BetroundDetailsComponent,
    GroupChatComponent
  ],
  imports: [CommonModule, BetsRoutingModule, FormsModule],
})
export class BetsModule {}
