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
import { GameTableComponent } from "./components/game-table/game-table.component";
import { SystemdateModalComponent } from './components/systemdate-modal/systemdate-modal.component';
import { VerificationModalComponent } from './components/verification-modal/verification-modal.component';
import { LoginComponent } from "./components/login/login.component";
import { LeagueDeleteComponent } from './components/league-delete/league-delete.component';
import { LeagueUpdateComponent } from './components/league-update/league-update.component';
import { SharedModule } from "./shared/shared.module";
import {CookieService} from "./Service/cookie.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeagueTableComponent,
    RegistrationModalComponent,
    LeagueCreationModalComponent,
    homePage,
    GameTableComponent,
    SystemdateModalComponent,
    VerificationModalComponent,
    LoginComponent,
    LeagueDeleteComponent,
    LeagueUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    NgxCsvParserModule,
    SharedModule
  ],
  providers: [LeagueService,CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
