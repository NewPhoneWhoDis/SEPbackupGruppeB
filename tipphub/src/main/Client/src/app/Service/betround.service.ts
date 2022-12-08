import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../Model/Game";

@Injectable({
  providedIn: 'root'
})
export class BetroundService {

  betroundURL: string
  constructor(private http: HttpClient) {this.betroundURL = 'http://localhost:8080/betround'}

  public getBetHelp(gameId: number): Observable<Game>{
    return this.http.get<Game>(`${this.betroundURL}/getBetHelp/${gameId}`);
  }
}
