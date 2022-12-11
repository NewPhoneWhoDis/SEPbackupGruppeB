import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Betround } from "../Model/Betround";
import { RegistrationRequest } from "../Model/RegistrationRequest";

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
  betroundURL: string;
  visible: boolean = true;

  constructor(private http: HttpClient) {
    this.betroundURL = "http://localhost:8080/betround";
  }

  public addNewBetround(
    leagueId: number,
    ownerId: number,
    betround: Betround
  ): Observable<Betround> {
    return this.http.put<Betround>(
      `${this.betroundURL}/betround/${leagueId}/${ownerId}`,
      betround
    );
  }
}
