import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationUrl: string;
  constructor(private http: HttpClient) {
    this.notificationUrl = "http://localhost:8080/notification";
  }

  public requestBetPermission(userId: number): Observable<any>{
    return this.http.put<any>(`${this.notificationUrl}/requestBetPermission/${userId}`,null);
  }

  public processBetPermission(betPermissionId: number, permit: boolean): Observable<any>{
    return this.http.put<any>(`${this.notificationUrl}/processBetPermission/${betPermissionId}?permit=${permit}`,null);
  }
}
