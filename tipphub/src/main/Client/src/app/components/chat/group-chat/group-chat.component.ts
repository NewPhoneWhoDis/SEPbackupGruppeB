import { StorageService } from './../../../Service/storage.service';
import { User } from 'src/app/Model/User';
import { UserService } from './../../../Service/user.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

  @ViewChild('messageInput')
  messageInput!: { nativeElement: { value: string; }; };
  //@Input() currUserId: number | undefined = 1;
  //@Input() friendOfCurrUserId: number | undefined = 1;
  currentUser: User | undefined;

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

}
