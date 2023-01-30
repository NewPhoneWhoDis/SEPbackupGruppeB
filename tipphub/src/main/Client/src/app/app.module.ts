import { BetsModule } from "./bets/bets.module";
import { BetsRoutingModule } from "./bets/bets-routing.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxCsvParserModule } from "ngx-csv-parser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LayoutModule } from "@angular/cdk/layout";
import { LeagueTableComponent } from "./components/league-table/league-table.component";
import { LeagueCreationModalComponent } from "./components/league-creation-modal/league-creation-modal.component";
import { LeagueService } from "./Service/league.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { homePage } from "./components/pages/homePage/homePage";
import { RegistrationModalComponent } from "./components/registration-modal/registrationModal.component";
import { SystemdateModalComponent } from "./components/systemdate-modal/systemdate-modal.component";
import { VerificationModalComponent } from "./components/verification-modal/verification-modal.component";
import { LoginComponent } from "./components/login/login.component";
import { LeagueDeleteComponent } from "./components/league-delete/league-delete.component";
import { LeagueUpdateComponent } from "./components/league-update/league-update.component";
import { SharedModule } from "./shared/shared.module";
import { CookieService } from "./Service/cookie.service";
import { FriendslistComponent } from "./components/friendslist/friendslist.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { BetroundCreationModalComponent } from "./components/betround-creation-modal/betround-creation-modal";
import { BetHelpComponent } from "./components/bet-help/bet-help.component";
import { betroundPage } from "./components/pages/betroundPage/betroundPage";
import { LeageCreationPageComponent } from "./components/pages/leage-creation-page/leage-creation-page.component";
import { GameTableBetsComponent } from "./components/game-table-bets/game-table-bets.component";
import { BetroundFilterPipePipe } from "./Pipes/betround-filter-pipe.pipe";
import { ChatModalComponent } from "./components/chat-modal/chat-modal.component";
import { MinigameComponent } from "./components/minigame/minigame.component";
import { StatisticsPageComponent } from "./components/pages/statistics/statistics-page/statistics-page.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeagueTableComponent,
    RegistrationModalComponent,
    LeagueCreationModalComponent,
    BetroundCreationModalComponent,
    homePage,
    betroundPage,
    SystemdateModalComponent,
    VerificationModalComponent,
    LoginComponent,
    LeagueDeleteComponent,
    LeagueUpdateComponent,
    BetHelpComponent,
    FriendslistComponent,
    ProfileComponent,
    NotificationComponent,
    LeageCreationPageComponent,
    GameTableBetsComponent,
    BetroundFilterPipePipe,
    ChatModalComponent,
    MinigameComponent,
    StatisticsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    NgxCsvParserModule,
    SharedModule,
    BetsRoutingModule,
    BetsModule,
  ],
  providers: [LeagueService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
