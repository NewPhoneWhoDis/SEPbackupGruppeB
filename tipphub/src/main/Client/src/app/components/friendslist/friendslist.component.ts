import {Component, Injectable, Input, OnInit} from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistService} from "../../Service/friendslist.service";
import {StorageService} from "../../Service/storage.service";
import {UserService} from "../../Service/user.service";
import {CookieService} from "../../Service/cookie.service";
@Injectable({
  providedIn: 'root'
})
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
  clickedFriend : User | undefined;

  constructor(private friendslistService : FriendslistService, private storageService : StorageService, private userService : UserService) { }

  ngOnInit(): void {
    this.friendslistService.getAllFriends(this.storageService.getLoggedUser()).subscribe(data =>{this.friends = data})
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
  }

  addFriend(email : String): void {
    this.userService.getUserByEmail(email).subscribe(data =>{
      this.foundUser = data
      console.log(this.currentUser?.id,this.foundUser?.id )
      if (this.userService.getUserById(this.foundUser?.id)){
        this.friendslistService.addFriend(this.currentUser?.id,this.foundUser?.id).subscribe((data) => {
          window.location.reload();
          console.log(data)
        });
        console.log("Added Friend: " + email + " " + this.foundUser?.id)
      }else {
        //todo validation
      }
    });


  }

  deleteFriend(friendId : number | undefined): void{
    this.friendslistService.deleteFriend(this.currentUser?.id,friendId).subscribe((data) => {
      window.location.reload();
      console.log(data)
    });
  }

  setClickedFriend(friend : User){
    this.storageService.saveClickedUser(friend);
  }
  /*openOptions(): void{
    this.isOpen = true;
  }*/

}
