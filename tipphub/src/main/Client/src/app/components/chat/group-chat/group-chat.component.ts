import { NavigationEnd, Router } from '@angular/router';
import { Message } from './../../../Model/Message';
import { BetroundService } from './../../../Service/betround.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../../Service/storage.service';
import { User } from 'src/app/Model/User';
import { UserService } from './../../../Service/user.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/Service/chat.service';
import { Subscription, switchMap, interval } from 'rxjs';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {

  @ViewChild('messageInput')
  messageInput!: { nativeElement: { value: string; }; };
  currentUser: User | undefined;
  currentUserMessages: Array<Message> = [];
  friendMessages: Array<Message> = [];
  betroundIdString: string | null = '';
  betroundId: number | undefined;
  users: User[] | undefined;
  usersIds: number[] | undefined;
  private intervalSubscription: Subscription | undefined;
  private intervalId: any;

  constructor(
  private userService: UserService, 
  private storageService: StorageService, 
  private route: ActivatedRoute,
  private router: Router,
  private betroundService: BetroundService,
  private chatService: MessageService) { }
  

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{
      this.currentUser = data
    });


  this.betroundIdString = this.route.snapshot.paramMap.get('id');
  if(this.betroundIdString && !isNaN(Number(this.betroundIdString))){
    this.betroundId = +this.betroundIdString;

    this.intervalSubscription = interval(2000)
    .pipe(
      switchMap(() => {
        return this.betroundService.getAllParticipants(this.betroundId)
      }),
      switchMap(users => {
        this.users = users;
        this.usersIds = users.map(user => user.id as number)
        return this.chatService.getGroupChat(this.betroundId as number);
      })
    )
    .subscribe(messages => {
      this.friendMessages = messages;
    });
    
  }else{
    console.log("BetroundId is not defined or is not a number")
  }

  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.ngOnDestroy();
    }
  });

    console.log(this.users)
  }

  ngOnDestroy() {
    if(this.intervalSubscription)
    this.intervalSubscription.unsubscribe();
  }


  saveMessage(message: string, currentUserId: number | undefined) {
    let messageObject: Message = new Message();
    messageObject.message = message;
    messageObject.dateOfCreation = new Date();
    let betroundId: number = +this.betroundIdString!;
    this.chatService.saveMessageInDatabaseGroupChat(messageObject, this.currentUser?.id as number, betroundId).subscribe();
    console.log(messageObject);
  }

  sendMessage(message: string, currentUserId: number | undefined) {
    let messageToPush = new Message()
    messageToPush.message = message;
    messageToPush.messageAuthor = this.currentUser;
    this.currentUserMessages.push(messageToPush);
    this.saveMessage(messageToPush.message, currentUserId as number);
    this.messageInput.nativeElement.value = ' ';
  }

}
