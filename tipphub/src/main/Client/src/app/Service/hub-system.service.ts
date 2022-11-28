import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HubSystem} from "../Model/HubSystem";

const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class HubSystemService {

  hubSystemURL: string
  constructor(private http: HttpClient) {this.hubSystemURL = 'http://localhost:8080/date'}

  public getSystemDate(): Observable<Date>{
    return this.http.get<Date>(`${this.hubSystemURL}/get`);
  }

  public changeSystemDate(dateId: number, hubSystem: HubSystem):Observable<HubSystem>{
    return this.http.put<HubSystem>(`${this.hubSystemURL}/change/${dateId}`,hubSystem, httpHeaders);
  }
}
