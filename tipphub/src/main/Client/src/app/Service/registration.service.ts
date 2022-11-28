import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Model/User";
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
export class RegistrationService {
  userURL: string;
  visible: boolean = true;

  constructor(private http: HttpClient) {
    this.userURL = "http://localhost:8080";
  }

  public addNewUser(
    request: RegistrationRequest
  ): Observable<RegistrationRequest> {
    return this.http.post<RegistrationRequest>(
      `${this.userURL}/api/auth/signup`,
      request,
      httpHeaders
    );
  }
}
