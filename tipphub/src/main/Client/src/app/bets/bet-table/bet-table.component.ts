import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/Model/Game";
import { League } from "src/app/Model/League";
import { StatisticTeam } from "src/app/Model/StatisticTeam";
import { BetroundService } from "src/app/Service/betround.service";
import { LeagueService } from "src/app/Service/league.service";

@Component({
  selector: "app-bet-table",
  templateUrl: "./bet-table.component.html",
  styleUrls: ["./bet-table.component.css"],
})
export class BetTableComponent implements OnInit {
  teams: Array<StatisticTeam> = new Array();

  constructor(private betroundService: BetroundService) {}

  ngOnInit(): void {
    this.betroundService.getAllTeams(1).subscribe((data) => {
      this.teams = data;
      console.log(this.teams);
    });
  }

  showTeamTable(league: League) {
    this.teams = league.teams;
  }
}
