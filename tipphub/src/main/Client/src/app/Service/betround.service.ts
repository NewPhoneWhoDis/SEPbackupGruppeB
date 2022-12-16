import { Betround } from './../Model/Betround';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {League} from "../Model/League";
import { User } from '../Model/User';
import { Bet } from '../Model/Bet';
import {Game} from "../Model/Game";


const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }),
};
@Injectable({
  providedIn: "root",
})
export class BetroundService {
  private betroundUrl: string;

  constructor(private http: HttpClient) {
    this.betroundUrl = "http://localhost:8080/betround";
  }

  public getAllBetrounds(): Observable<Betround[]> {
    return this.http.get<Betround[]>(`${this.betroundUrl}/all`, httpHeaders);
  }

  public addNewBetround(
    league: League,
    owner: User,
    betround: Betround
  ): Observable<Betround> {
    return this.http.put<Betround>(
      `${this.betroundUrl}/add/${league.id}/${owner.id}`,
      betround,
      httpHeaders
    );
  }

  public betInRound(ownerId: number, betroundId: number, bet: Bet): Observable<any> {
    return this.http.put<Betround>(`${this.betroundUrl}/bet/${ownerId}/${betroundId}`, bet, httpHeaders);
  }

  public getEvaluationInRound(ownerId: number, betroundId: number): Observable<number> {
    return this.http.get<number>(`${this.betroundUrl}/evaluation/${ownerId}/${betroundId}`, httpHeaders);
  }

  public getBestBetters(leaugeId: number | undefined): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.betroundUrl}/getBest/${leaugeId}`, httpHeaders);
  }

  public getBestTeams(leagueId: number | undefined): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.betroundUrl}/getTopThreeTeams/${leagueId}`, httpHeaders);
  }


  public getAllParticipants(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.betroundUrl}/getAllParticipants/${userId}`, httpHeaders);
  }


  public getBetHelp(gameId: number): Observable<Game>{
    return this.http.get<Game>(`${this.betroundUrl}/getBetHelp/${gameId}`, httpHeaders);
  }

  public sendEmailInviteBetround(betroundId: number, targetUserId: number) {
    ///onLinkClick/{userId}/{betroundId}
    return this.http.get(`${this.betroundUrl}/getInivteURL/${betroundId}/${targetUserId}`);
  }  
  public setNickname(userId: number, betroundId: number, nickname: string): Observable<any> {
    return this.http.put<any>(`${this.betroundUrl}/setNickname/${userId}/${betroundId}?nickname=${nickname}`, httpHeaders);
  }

  public shareBet(friendId: number | undefined, betId: number | undefined): Observable<any>{
    let shareBetUrl = this.betroundUrl.replace("betround","notification/shareBet");
    return this.http.put<any>(`${shareBetUrl}/${friendId}/${betId}`,null,httpHeaders);
  }

  public getLeagueId(betroundId: number) {
    return this.http.get<number>(`${this.betroundUrl}/getLeagueId/${betroundId}`, httpHeaders);
  }
}
