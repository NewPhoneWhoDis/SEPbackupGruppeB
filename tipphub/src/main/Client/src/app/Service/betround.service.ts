import { Betround } from './../Model/Betround';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {League} from "../Model/League";
import { User } from '../Model/User';
import { Bet } from '../Model/Bet';

@Injectable({
  providedIn: 'root'
})
export class BetroundService {

  private betroundUrl: string;

  constructor(private http: HttpClient) {
    this.betroundUrl = 'http://localhost:8080/betround';
  }

  public getAllBetrounds(): Observable<Betround[]> {
    return this.http.get<Betround[]>(`${this.betroundUrl}/all`);
  }

  public addNewBetround(leagueId: number, ownerId: number, betround: Betround): Observable<Betround> {
    return this.http.put<Betround>(`${this.betroundUrl}/add/${leagueId}/${ownerId}`, betround);
  }

  public betInRound(ownerId: number, betroundId: number, betround: Betround): Observable<Betround> {
    return this.http.put<Betround>(`${this.betroundUrl}/bet/${ownerId}/${betroundId}`, betround);
  }

}
