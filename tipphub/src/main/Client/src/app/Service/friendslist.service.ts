import { Injectable } from '@angular/core';
import {Observable, ObservedValueOf} from "rxjs";
import {User} from "../Model/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {FriendRequest} from "../Model/FriendRequest";

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
    this.userURL = "http://localhost:8080/";
  }


  public getAllFriends(userID : number | undefined) : Observable<User[]>{
      return this.http.get<User[]>(`${this.userURL}user/friends/${userID}`);
  }

  public deleteFriend(userID : number | undefined, friendID : number | undefined) : Observable<void>{
    return this.http.delete<void>(`${this.userURL}user/friends/remove/${userID}/${friendID}`);
  }

  public sendFriendRequest(friendRequest: FriendRequest, friendEmail: String): Observable<any>{
    return this.http.put<any>(`${this.userURL}notification/friendRequest?friendEmail=${friendEmail}`,friendRequest);
  }

  public processFriendRequest(userId: number | undefined, friendRequestId: number, add: boolean): Observable<any>{
    return this.http.put<any>(`${this.userURL}notification/processFriendRequest/${userId}/${friendRequestId}?add=${add}`,null);
  }

  public isFriends(userId : number | undefined, friendId : number | undefined) : Observable<boolean>{
    console.log("isFriends wird ausgeführt...")
    return this.http.get<boolean>(`http://localhost:8080/user/isFriends/${userId}/${friendId}`)
  }
}
