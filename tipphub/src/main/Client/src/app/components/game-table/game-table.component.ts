import { Component, OnInit } from '@angular/core';
import {League} from "../../Model/League";
import {LeagueService} from "../../Service/league.service";
import {Game} from "../../Model/Game";
import {HubSystemService} from "../../Service/hub-system.service";

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {
  leagues: League[] | undefined;
  leaguesWithGames = new Map<League, Game[]>();
  systemDate: Date | undefined;
  constructor(private leagueService: LeagueService, private hubSystemService: HubSystemService) {}

  ngOnInit(): void {
    this.hubSystemService.getSystemDate().subscribe((data) =>{this.systemDate = data});
    this.leagueService.getAllLeagues().subscribe(data => {
      this.leagues = data
      for(let m = 0; m < this.leagues.length; m++){
        let games = new Array<Game>()
        for(let i = 0; i < this.leagues[m].gameSchedule.gamedayList.length; i++){
          for(let j = 0; j < this.leagues[m].gameSchedule.gamedayList[i].games.length; j++){
            this.leagues[m].gameSchedule.gamedayList[i].games[j].id = this.leagues[m].gameSchedule.gamedayList[i].round;
            // @ts-ignore
            if(new Date(this.systemDate).getTime() < new Date(this.leagues[m].gameSchedule.gamedayList[i].games[j].date).getTime()){
              this.leagues[m].gameSchedule.gamedayList[i].games[j].scoreAwayTeam = undefined;
              this.leagues[m].gameSchedule.gamedayList[i].games[j].scoreHomeTeam = undefined;
            }
            games.push(this.leagues[m].gameSchedule.gamedayList[i].games[j]);
          }
        }
        this.leaguesWithGames.set(this.leagues[m],games);
      }
    });
  }

}
