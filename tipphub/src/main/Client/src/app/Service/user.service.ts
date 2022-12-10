import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Model/User";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userURL: string;
  constructor(private http: HttpClient) {
    this.userURL = "http://localhost:8080/user";
  }

  // Might be necessary for a User-Management-Page later on
  // public getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.userURL}/all`);
  // }

  // Adds new user and sends him to /add Endpoint
  public addNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userURL}/add`, user);
  }

  public getUserByEmail(email: String): Observable<User>{
    return this.http.get<User>(`${this.userURL}/getUserByEmail/${email}`);
  }

  public getUserById(userId : number | undefined) : Observable<User>{
    return this.http.get<User>(`${this.userURL}/getUserById/${userId}`);
  }
}
