import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {StorageService} from "../../Service/storage.service";
import {UserService} from "../../Service/user.service";
import {FriendslistService} from "../../Service/friendslist.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  currentUser : User | undefined;
  constructor(private storageService: StorageService, private userService: UserService, private friendslistService : FriendslistService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data
      console.log(this.currentUser);
      console.log("test")
    });
  }

  processFriendRequest(friendRequestId: number, add: boolean){
    this.friendslistService.processFriendRequest(this.currentUser?.id,friendRequestId,add).subscribe();
    window.location.reload();
  }
}
