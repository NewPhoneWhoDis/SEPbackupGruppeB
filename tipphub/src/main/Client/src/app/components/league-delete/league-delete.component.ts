import { Component, OnInit } from "@angular/core";
import { League } from "../../Model/League";
import { LeagueService } from "../../Service/league.service";
import { Observable, Subscriber } from "rxjs";

@Component({
  selector: "app-league-delete",
  templateUrl: "./league-delete.component.html",
  styleUrls: ["./league-delete.component.css"],
})
export class LeagueDeleteComponent implements OnInit {
  league: League;
  leagues: League[] | undefined;

  constructor(private leagueService: LeagueService) {
    this.league = new League();
  }

  ngOnInit(): void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });
  }

  onSubmit() {
    if (this.leagues) {
      for (let league of this.leagues) {
        if (league.name === this.league.name) {
          if (league.id) {
            this.leagueService.deleteLeague(league.id).subscribe((data) => {
              window.location.reload();
            });
          }
        }
      }
    }
  }

  closePopUp() {
    this.leagueService.togglePopUp();
  }

  isPopUpOpen() {
    return this.leagueService.isPopUpOpen();
  }
}
