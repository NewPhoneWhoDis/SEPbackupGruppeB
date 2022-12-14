import { Component, OnInit } from '@angular/core';
import {League} from "../../Model/League";
import {Game} from "../../Model/Game";
import {LeagueService} from "../../Service/league.service";
import {HubSystemService} from "../../Service/hub-system.service";
import {BetroundService} from "../../Service/betround.service";
import {Bet} from "../../Model/Bet";
import {StorageService} from "../../Service/storage.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-game-table-bets',
  templateUrl: './game-table-bets.component.html',
  styleUrls: ['./game-table-bets.component.css']
})
export class GameTableBetsComponent implements OnInit {

  leagues: League[] | undefined;
  leaguesWithGames = new Map<League, Game[]>();
  systemDate: Date | undefined;
  bet: Bet = new Bet();
  gameBetHelp: Game = new Game();

  constructor(private leagueService: LeagueService,
              private hubSystemService: HubSystemService,
              private betroundService: BetroundService,
              private storageService: StorageService) {}

  ngOnInit(): void {
    this.hubSystemService.getSystemDate().subscribe((data) =>{this.systemDate = data});
    this.leagueService.getAllLeagues().subscribe(data => {
      this.leagues = data
      for(let m = 0; m < this.leagues.length; m++){
        this.betroundService.getBestBetters(this.leagues[m].id).subscribe((data) => {
          // @ts-ignore
          this.leagues[m].topBetters = data;
          // @ts-ignore
          if(this.leagues[m].topBetters.length < 3){
            // @ts-ignore
            this.leagues[m].topBetters.push("","");
          }
        });
        this.betroundService.getBestTeams(this.leagues[m].id).subscribe((data) => {
          // @ts-ignore
          this.leagues[m].topTeams = data;
        });
        let games = new Array<Game>()
        for(let i = 0; i < this.leagues[m].gameSchedule.gamedayList.length; i++){
          for(let j = 0; j < this.leagues[m].gameSchedule.gamedayList[i].games.length; j++){
            this.leagues[m].gameSchedule.gamedayList[i].games[j].round = this.leagues[m].gameSchedule.gamedayList[i].round;
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

  showPopUp(game: Game){
    this.bet.homeTeam = game.homeTeam;
    this.bet.awayTeam = game.awayTeam;
    this.bet.dateOfBet = this.systemDate;
    this.bet.dateOfGame = game.date;
    console.log(game);
  }

  betInRound(): void{
    console.log(this.bet)
    console.log(this.storageService.getLoggedUser())
    this.betroundService.betInRound(this.storageService.getLoggedUser(),1,this.bet).subscribe();
    window.alert("Wette wurde erfolgreich platziert!")
    location.reload()
  }

  getBetHelp(gameId: number | undefined): void{
    if (gameId != null) {
      this.betroundService.getBetHelp(gameId).subscribe((data) => {
        this.gameBetHelp = data;
      })
    }
  }

}