import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HubSystem} from "../Model/HubSystem";
import {Observable} from "rxjs";

const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',})
};

@Injectable({
  providedIn: 'root'
})
export class SystemdateService {

  userURL: string;
  constructor(private http:HttpClient) {
    this.userURL = "http://localhost:8080"
  }

  public changeSystemdate(hubSystem : HubSystem) : Observable<HubSystem>{
    return this.http.post<HubSystem>(`${this.userURL}/date`, hubSystem,httpHeaders);
  }
}
