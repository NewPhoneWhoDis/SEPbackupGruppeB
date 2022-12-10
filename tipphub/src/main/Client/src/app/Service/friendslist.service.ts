import { Injectable } from '@angular/core';
import {Observable, ObservedValueOf} from "rxjs";
import {User} from "../Model/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";

const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',})
};
@Injectable({
  providedIn: 'root'
})
export class FriendslistService {
  userURL : String;

  constructor(private http: HttpClient) {
    this.userURL = "http://localhost:8080/user/friends/";
  }

  public addFriend(userID : number | undefined, friendID : number | undefined): Observable<User>{
    return this.http.put<User>(`${this.userURL}add/${userID}/${friendID}`,null);
  }

  public getAllFriends(userID : number | undefined) : Observable<User[]>{
      return this.http.get<User[]>(`${this.userURL}${userID}`);
  }

  public deleteFriend(userID : number, friendID : number) : Observable<void>{
    return this.http.delete<void>(`${this.userURL}remove/${userID}/${friendID}`);
  }
}
