import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/Model/Message';
import { User } from 'src/app/Model/User';
import { MessageService } from 'src/app/Service/chat.service';
import { StorageService } from 'src/app/Service/storage.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit {
  @ViewChild('messageInput')
  messageInput!: { nativeElement: { value: string; }; };
  @Input() currUserId: number | undefined = 1;
  @Input() friendOfCurrUserId: number | undefined = 13;
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
    this.userService.getUserById(this.friendOfCurrUserId).subscribe(data => {this.friendUser = data});
    console.log(this.friendUser)
  }

  sendMessage(message: string, currentUserId: number | undefined) {
    this.currentUserMessages.push(message);
    this.saveMessage(message, currentUserId as number);
    this.messageInput.nativeElement.value = ' ';
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
    let messageObject: Message = new Message();
    messageObject.message = message;
    authorOfMessage.id = currentUserId;
    this.userService.getUserById(currentUserId as number).subscribe(data => {authorOfMessage = data});
    this.messageService.saveMessageInDatabase(messageObject);
    console.log(messageObject.message);
  }

}
