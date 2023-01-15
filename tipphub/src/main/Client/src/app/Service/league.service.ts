import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {League} from "../Model/League";
import {GameSchedule} from "../Model/GameSchedule";
import {Gameday} from "../Model/Gameday";
import {Game} from "../Model/Game";
import {Team} from "../Model/Team";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  leagueURL: string;
  visible: boolean = true;
  constructor(private http: HttpClient) {this.leagueURL = 'http://localhost:8080/league'}

  public getAllLeagues(): Observable<League[]>{
    return this.http.get<League[]>(`${this.leagueURL}/all`);
  }

  public addNewLeague(league: League): Observable<League> {
    return this.http.post<League>(`${this.leagueURL}/add`,league);
  }

  public deleteLeague(leagueId: number): Observable<void>{
    return this.http.delete<void>(`${this.leagueURL}/deleteLeague/${leagueId}`);
  }

  public addGame(leagueId: number, game: Game):Observable<Game>{
    return this.http.put<Game>(`${this.leagueURL}/addGame/${leagueId}`,game);
  }

  public deleteGame(gameId: number): Observable<void>{
    return this.http.delete<void>(`${this.leagueURL}/deleteGame/${gameId}`);
  }


  public changeNameAndLogo(leagueId: number, league: League): Observable<League>{
    return this.http.put<League>(`${this.leagueURL}/changeNameAndLogo/${leagueId}`,league);
  }

  public getAllTeams(leagueId: number | undefined): Observable<Team[]>{
    let teamUrl = this.leagueURL.replace('league','team/getAllTeams');
    return this.http.get<Team[]>(`${teamUrl}/${leagueId}`);
  }

  public isPopUpOpen() {
    return this.visible;
  }

  public togglePopUp() {
    return this.visible = !this.visible;
  }

  public addGameSchedule(league: League, csvRecords: any): League{
    let gameSchedule = new GameSchedule();
    let currentRound = csvRecords[1][0];
    let gameday = new Gameday();
    for(let i = 1; i < csvRecords.length; i++){
      if(currentRound != csvRecords[i][0]){
        gameday.round = currentRound;
        gameSchedule.gamedayList.push(gameday);
        gameday = new Gameday();
        currentRound = csvRecords[i][0];
      }
      let game = new Game();
      let score = csvRecords[i][3].split("-");
      game.scoreHomeTeam = score[0];
      game.scoreAwayTeam = score[1];
      game.homeTeam = csvRecords[i][2];
      game.awayTeam = csvRecords[i][4];
      game.date = new Date(csvRecords[i][1]);
      gameday.games.push(game);
    }
    league.gameSchedule = gameSchedule;
    return league;
  }



}
