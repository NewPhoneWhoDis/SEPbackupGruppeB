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
  @Input() friendOfCurrUserId: number | undefined = 1;
  currentUserMessages: Array<String> = [];
  friendMessages: Array<String> = [];
  currentUser : User | undefined;
  friendUser: User | undefined;
  clickedFriend: User | undefined;

  constructor(private messageService: MessageService, 
    private userService: UserService,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    const user = window.sessionStorage.getItem("clickedFriend");
    if (user) {
      this.clickedFriend= JSON.parse(user);
      console.log(this.clickedFriend?.id);
    }
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

  ngAfterViewInit() {
    if(this.currentUser)
    this.messageService.getAuthorMessages(this.currentUser?.id as number).subscribe(data => {
      this.currentUserMessages = data;
    })

    console.log("Current user messages: " + this.currentUserMessages)

    if(this.clickedFriend)
    this.messageService.getReceiverMessages(this.clickedFriend?.id as number).subscribe(data => {
      this.friendMessages = data;
    })

    console.log("Friend messages:" + this.friendMessages);
  }

  sendMessage(message: string, currentUserId: number | undefined) {
    this.currentUserMessages.push(message);
    this.saveMessage(message, currentUserId as number);
    this.messageInput.nativeElement.value = ' ';
  }

  getCurrentUserMessages() {
    this.messageService.getAuthorMessages(this.clickedFriend?.id as number).subscribe(data => {
      this.currentUserMessages = data;
    })
    return this.currentUserMessages;
  }

  getFriendUserMessages() {
    this.messageService.getReceiverMessages(this.clickedFriend?.id as number).subscribe(data => {
      this.friendMessages = data;
    })
    return this.friendMessages;
  }

  saveMessage(message: string, currentUserId: number) {
    let messageObject: Message = new Message();
    messageObject.message = message;
    messageObject.dateOfCreation = new Date();
    this.messageService.saveMessageInDatabase(messageObject, this.currentUser?.id as number, 
      this.clickedFriend?.id as number).subscribe();
    console.log(messageObject);
  }

}
