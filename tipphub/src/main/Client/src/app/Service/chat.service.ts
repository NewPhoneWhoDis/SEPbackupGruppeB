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

  public getAuthorMessages(currentUserId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messageUrl}/getAuthorMessages/${currentUserId}`)
  }

  public getReceiverMessages(receiverId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messageUrl}/getReceiverMessages/${receiverId}`)
  }

  public saveMessageInDatabase(message: Message, authorId: number, receiverId: number): Observable<Message>{
    return this.http.put<Message>(`${this.messageUrl}/messageToSave/${authorId}/${receiverId}`, message);
  }
}
