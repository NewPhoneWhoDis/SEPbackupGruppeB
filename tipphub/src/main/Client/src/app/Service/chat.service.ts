import { Message } from './../Model/Message';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//!Example code:
export class MessageService {
  messageUrl: string = 'http://localhost:8080/message';

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

  public saveMessageInDatabase(message: Message): Observable<Message>{
    return this.http.put<Message>(`${this.messageUrl}/messageToSave`, message);
  }
}
