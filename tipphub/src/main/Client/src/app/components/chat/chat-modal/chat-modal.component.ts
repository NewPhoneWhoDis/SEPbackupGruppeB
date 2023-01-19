import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs';
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
  currentUserMessages: Array<Message> = [];
  friendMessages: Array<Message> = [];
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
      console.log('This is the friend' + this.clickedFriend?.id);
    }

    this.userService.getUserById(this.storageService.getLoggedUser())
    .pipe(
    switchMap(user => {
        this.currentUser = user;
        return this.messageService.getChat(this.currentUser?.id as number, this.clickedFriend?.id as number);
    }),
    switchMap(chat => {
        this.currentUserMessages = chat;
        return this.messageService.getChat(this.clickedFriend?.id as number, this.currentUser?.id as number)
    })
)
.subscribe(data => this.friendMessages = data);
  }


  sendMessage(message: string, currentUserId: number | undefined) {
    let messageToPush = new Message()
    messageToPush.message = message;
    messageToPush.messageAuthor = this.currentUser;
    this.currentUserMessages.push(messageToPush);
    this.saveMessage(messageToPush.message, currentUserId as number);
    this.messageInput.nativeElement.value = ' ';
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
