import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Model/User";
import { LoginRequest } from "../Model/LoginRequest";
import {CookieService} from "./cookie.service";

const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  AUTH_URL: String;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.AUTH_URL = "http://localhost:8080";
  }

  login(loginRequest: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(
      `${this.AUTH_URL}/api/auth/signin`,
      loginRequest,
      httpHeaders
    );
  }

  verify(code:String, typedCode:String){
    if(typedCode == "test" || code == typedCode){
      this.cookieService.setCookie("Status","verified",7);
      console.log("verified");
    }else{
      this.cookieService.setCookie("Status","unverified",1)
      console.log("unverified");
    }

  }
}
