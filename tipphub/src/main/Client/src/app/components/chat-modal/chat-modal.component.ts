import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { MessageService } from 'src/app/Service/message.service';
import { StorageService } from 'src/app/Service/storage.service';
import { UserService } from 'src/app/Service/user.service';

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

  constructor(private messageService: MessageService, 
    private userService: UserService,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

  sendMessage(message: string, currentUserId: number | undefined) {
    this.currentUserMessages.push(message);
    this.saveMessage(message, currentUserId as number);
  }

  getMessages() {
    /*
    this.messageService.getAllCurrentUserMessages().subscribe(data => {
      this.currentUserMessages = data;
    })
    */
  }

  saveMessage(message: string, currentUserId: number) {
    let authorOfMessage: User = new User();
    this.userService.getUserById(currentUserId as number).subscribe(data => {authorOfMessage = data});
    this.messageService.saveMessageInDatabase(message, authorOfMessage);
  }

}
