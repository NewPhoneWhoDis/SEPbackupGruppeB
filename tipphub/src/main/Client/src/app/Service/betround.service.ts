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
  providedIn: 'root'
})
export class BetroundService {

  private betroundUrl: string;

  constructor(private http: HttpClient) {
    this.betroundUrl = 'http://localhost:8080/betround';
  }

  public getAllBetrounds(): Observable<Betround[]> {
    return this.http.get<Betround[]>(`${this.betroundUrl}/all`, httpHeaders);
  }

  public addNewBetround(leagueId: number, ownerId: number, betround: Betround): Observable<Betround> {
    return this.http.put<Betround>(`${this.betroundUrl}/add/${leagueId}/${ownerId}`, betround, httpHeaders);
  }

  public betInRound(ownerId: number, betroundId: number, bet: Bet): Observable<any> {
    return this.http.put<Betround>(`${this.betroundUrl}/bet/${ownerId}/${betroundId}`, bet);
  }

  public getEvaluationInRound(ownerId: number, betroundId: number) {
    return this.http.get<Betround>(`${this.betroundUrl}/evaluation/${ownerId}/${betroundId}`);
  }

  public generateInvite(betroundId: number, ownerId: number, targetetUserId: number, betround: Betround): Observable<Betround> {
    return this.http.put<Betround>(`${this.betroundUrl}/inviteGeneration/${betroundId}/${ownerId}/${targetetUserId}`, betround);
  }

  //
  public getInviteURL(betround: Betround): Observable<Betround> {
    return this.http.get<Betround>(`${this.betroundUrl}/getInivteURL`);
  }

  public saveUserInBetrounds(userId: User, betroundId: Betround, betround: Betround): Observable<Betround> {
    return this.http.put<Betround>(`${this.betroundUrl}/getInivteURL/${userId}/${betroundId}`, betround);
  }

  public getBestBetters(leaugeId: number | undefined): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.betroundUrl}/getBest/${leaugeId}`);
  }

  public getBestTeams(leagueId: number | undefined): Observable<Array<string>>{
    return this.http.get<Array<string>>(`${this.betroundUrl}/getTopThreeTeams/${leagueId}`);
  }


  public getAllParticipants(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.betroundUrl}/getAllParticipants${userId}`);
  }


  public getBetHelp(gameId: number): Observable<Game>{
    return this.http.get<Game>(`${this.betroundUrl}/getBetHelp/${gameId}`);
  }

}
