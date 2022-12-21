import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit {
  currentUserMessages: Array<String> = [];
  friendMessages: Array<String> = [];
  currentUser : User | undefined;
  friendUser: User | undefined;

  constructor() {
  }

  ngOnInit(): void {
    
  }

  sendMessage(message: string) {
    //* Inject message service
  }

  getMessages() {
    /* Inject message service
    this.http.get<Array<String>>('/test/messages').subscribe(messages => {
      this.messages = messages;
    });
    */
  }

}
