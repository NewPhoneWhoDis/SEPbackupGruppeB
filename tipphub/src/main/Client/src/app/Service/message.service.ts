import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
//!Example code:
export class MessageService {
  messageUrl: string = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  public getAllMessages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.messageUrl}/all`)
  }

  public getAllCurrentUserMessages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.messageUrl}/all`)
  }

  public getSpecificUserAllMessages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.messageUrl}/all`)
  }

  public saveMessageInDatabase(message: string, user: User) {
    this.http.put(`${this.messageUrl}/save`, user);
  }
}
