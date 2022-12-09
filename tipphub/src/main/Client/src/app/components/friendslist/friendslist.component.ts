import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistService} from "../../Service/friendslist.service";
import {StorageService} from "../../Service/storage.service";
import {UserService} from "../../Service/user.service";

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {

  currentUser : User | undefined;
  friends : User[] | undefined;

  constructor(private friendslistService : FriendslistService, private storageService : StorageService, private userService : UserService) { }

  ngOnInit(): void {
    this.friendslistService.getAllFriends(this.storageService.getLoggedUser()).subscribe(data =>{this.friends = data})
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

}
