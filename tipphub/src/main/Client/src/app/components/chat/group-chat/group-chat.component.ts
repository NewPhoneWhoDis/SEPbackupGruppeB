import { BetroundService } from './../../../Service/betround.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './../../../Service/storage.service';
import { User } from 'src/app/Model/User';
import { UserService } from './../../../Service/user.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {

  @ViewChild('messageInput')
  messageInput!: { nativeElement: { value: string; }; };
  currentUser: User | undefined;
  currentUserMessages: Array<String> = [];
  friendMessages: Array<String> = [];
  betroundIdString: string | null = '';
  betroundId: number | undefined;
  users: User[] | undefined;

  constructor(
  private userService: UserService, 
  private storageService: StorageService, 
  private route: ActivatedRoute,
  private betroundService: BetroundService) { }
  

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.betroundIdString = this.route.snapshot.paramMap.get('id');
    if(this.betroundIdString){
      this.betroundId = +this.betroundIdString;
    }


    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{
      this.currentUser = data
    });

    this.betroundService.getAllParticipants(this.betroundId).subscribe(data => {
      this.users = data;
    })

    console.log(this.users)
  }

  sendMessage(message: string, currentUserId: number | undefined) {
    this.currentUserMessages.push(message);
    //this.saveMessage(message, currentUserId as number);
    this.messageInput.nativeElement.value = ' ';
  }

}
