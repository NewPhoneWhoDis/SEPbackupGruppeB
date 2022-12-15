import { Betround } from "./../Model/Betround";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { League } from "../Model/League";
import { User } from "../Model/User";
import { Bet } from "../Model/Bet";

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
    betround: Betround
  ): Observable<Betround> {
    return this.http.put<Betround>(
      `${this.betroundUrl}/bet/${ownerId}/${betroundId}`,
      betround
    );
  }

  public getEvaluationInRound(ownerId: number, betroundId: number) {
    return this.http.get<Betround>(
      `${this.betroundUrl}/evaluation/${ownerId}/${betroundId}`
    );
  }

  public generateInvite(
    betroundId: number,
    ownerId: number,
    targetetUserId: number,
    betround: Betround
  ): Observable<Betround> {
    return this.http.put<Betround>(
      `${this.betroundUrl}/inviteGeneration/${betroundId}/${ownerId}/${targetetUserId}`,
      betround
    );
  }

  //
  public getInviteURL(betround: Betround): Observable<Betround> {
    return this.http.get<Betround>(`${this.betroundUrl}/getInivteURL`);
  }

  public saveUserInBetrounds(
    userId: User,
    betroundId: Betround,
    betround: Betround
  ): Observable<Betround> {
    return this.http.put<Betround>(
      `${this.betroundUrl}/getInivteURL/${userId}/${betroundId}`,
      betround
    );
  }

  public getAllParticipants(userId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.betroundUrl}/getAllParticipants${userId}`
    );
  }

  /*
  public getBetHelp(gameId: number): Observable<Game>{
    return this.http.get<Game>(`${this.betroundURL}/getBetHelp/${gameId}`);
  }
  */
}
