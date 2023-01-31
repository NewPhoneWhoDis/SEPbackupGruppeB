import { Betround } from "./../Model/Betround";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { League } from "../Model/League";
import { User } from "../Model/User";
import { Bet } from "../Model/Bet";
import { Game } from "../Model/Game";
import { StatisticTeam } from "../Model/StatisticTeam";

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

  public betInRound(
    ownerId: number,
    betroundId: number,
    bet: Bet
  ): Observable<any> {
    return this.http.put<Betround>(
      `${this.betroundUrl}/bet/${ownerId}/${betroundId}`,
      bet,
      httpHeaders
    );
  }

  public getEvaluationInRound(
    ownerId: number,
    betroundId: number
  ): Observable<number> {
    return this.http.get<number>(
      `${this.betroundUrl}/evaluation/${ownerId}/${betroundId}`,
      httpHeaders
    );
  }

  public getBestBetters(
    leaugeId: number | undefined
  ): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `${this.betroundUrl}/getBest/${leaugeId}`,
      httpHeaders
    );
  }

  public getBestTeams(leagueId: number | undefined): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `${this.betroundUrl}/getTopThreeTeams/${leagueId}`,
      httpHeaders
    );
  }

  public getAllParticipants(
    betroundId: number | undefined
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.betroundUrl}/getAllParticipants/${betroundId}`,
      httpHeaders
    );
  }

  public getBetHelp(gameId: number): Observable<Game> {
    return this.http.get<Game>(
      `${this.betroundUrl}/getBetHelp/${gameId}`,
      httpHeaders
    );
  }

  public sendEmailInviteBetround(betroundId: number, targetUserId: number) {
    ///onLinkClick/{userId}/{betroundId}
    return this.http.get(
      `${this.betroundUrl}/getInivteURL/${betroundId}/${targetUserId}`
    );
  }

  public setNickname(
    userId: number,
    betroundId: number,
    nickname: string
  ): Observable<any> {
    return this.http.put<any>(
      `${this.betroundUrl}/setNickname/${userId}/${betroundId}?nickname=${nickname}`,
      httpHeaders
    );
  }

  public shareBet(
    friendId: number | undefined,
    betId: number | undefined
  ): Observable<any> {
    let shareBetUrl = this.betroundUrl.replace(
      "betround",
      "notification/shareBet"
    );
    return this.http.put<any>(
      `${shareBetUrl}/${friendId}/${betId}`,
      null,
      httpHeaders
    );
  }

  public getNickname(userId: number, betroundId: number): Observable<any> {
    var headers = new HttpHeaders().set(
      "Content-Type",
      "text/plain; charset=utf-8"
    );
    return this.http.get<any>(
      `${this.betroundUrl}/getNickname/${userId}/${betroundId}`,
      { headers, responseType: "text" as "json" }
    );
  }

  public getLeagueId(betroundId: number) {
    return this.http.get<number>(
      `${this.betroundUrl}/getLeagueId/${betroundId}`,
      httpHeaders
    );
  }

  public addUserToBetround(betroundId: number | undefined, userId: number) {
    return this.http.get<string>(
      `${this.betroundUrl}/onLinkClick/${betroundId}/${userId}`,
      httpHeaders
    );
  }

  public getBetAmountPerUserInRound(betroundId: number | undefined) {
    return this.http.get<Set<Map<string, number>>>(
      `${this.betroundUrl}/getAmountOfBetsPerUserInRound/${betroundId}`,
      httpHeaders
    );
  }

  public getAllTeams(
    betroundId: number | undefined
  ): Observable<Array<StatisticTeam>> {
    return this.http.get<Array<StatisticTeam>>(
      `http://localhost:8080/StatisticTeam/getAllTeams/${betroundId}`
    );
  }

  public getKeyBarDiagram(
    betroundId: number | undefined
  ): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `${this.betroundUrl}/getKeysBarDiagram/${betroundId}`
    );
  }

  public getValuesBarDiagram(
    betroundId: number | undefined
  ): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      `${this.betroundUrl}/getValuesBarDiagram/${betroundId}`
    );
  }

  public getKeyPieDiagram(
    userId: number | undefined,
    betroundId: number | undefined
  ): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `${this.betroundUrl}/getKeysPieDiagram/${userId}/${betroundId}`
    );
  }

  public getValuesPieDiagram(
    userId: number | undefined,
    betroundId: number | undefined
  ): Observable<Array<number>> {
    return this.http.get<Array<number>>(
      `${this.betroundUrl}/getValuesPieDiagram/${userId}/${betroundId}`
    );
  }
}
