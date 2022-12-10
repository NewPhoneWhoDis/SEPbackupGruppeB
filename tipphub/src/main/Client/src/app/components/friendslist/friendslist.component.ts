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
  foundUser : User | undefined;
  currentUser : User | undefined;
  friends : User[] | undefined;
  searchedUser : String = "";

  constructor(private friendslistService : FriendslistService, private storageService : StorageService, private userService : UserService) { }

  ngOnInit(): void {
    this.friendslistService.getAllFriends(this.storageService.getLoggedUser()).subscribe(data =>{this.friends = data})
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

  addFriend(email : String): void {
    this.userService.getUserByEmail(email).subscribe(data =>{this.foundUser = data});
    if (this.userService.getUserById(this.foundUser?.id)){
      this.friendslistService.addFriend(this.currentUser?.id,this.foundUser?.id)
      console.log("Added Friend: " + email + " " + this.foundUser?.id)
    }else {
      //todo validation
    }
  }
/*
  deleteFriend(friendId : number | undefined): void{
    this.friendslistService.deleteFriend(this.currentUser?.id,friendId)
  }*/

  /*openOptions(): void{
    this.isOpen = true;
  }*/

}
