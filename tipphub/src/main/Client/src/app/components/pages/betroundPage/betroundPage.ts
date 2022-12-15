import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LeagueTableComponent } from "src/app/components/league-table/league-table.component";

@Component({
  selector: "betroundPage",
  templateUrl: "./betroundPage.html",
})
export class betroundPage {
  constructor(private router: Router) {}

  betsManagementClick($event: Event) {
    $event.preventDefault();
    this.router.navigateByUrl("/bets-management");
  }
}
