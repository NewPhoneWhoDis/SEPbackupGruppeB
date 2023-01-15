import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistComponent} from "../friendslist/friendslist.component";
import {UserService} from "../../Service/user.service";
import {data} from "autoprefixer";
import {FriendslistService} from "../../Service/friendslist.service";
import {StorageService} from "../../Service/storage.service";
//import { Modal } from 'daisyui';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  clickedFriend : User | undefined;
  clickedFriendId : number | undefined;
  isFriend : boolean | undefined;
  currentUser : User | undefined;
  modalUrl: string = "#chat-modal";
  constructor(private userService : UserService, private friendslistService : FriendslistService, private storageService : StorageService) {
  }

  ngOnInit(): void {

    const user = window.sessionStorage.getItem("clickedFriend");
    if (user) {
      this.clickedFriend= JSON.parse(user);
    }
    this.userService.getUserById(this.storageService.getLoggedUser()).subscribe(data =>{this.currentUser = data});
    //this.friendslistService.isFriends(this.storageService.getLoggedUser(),this.storageService.getClickedUser()).subscribe((data) => {this.isFriend = data});
  }

  public getFriendFirstname(): any {
    const user = window.sessionStorage.getItem("clickedFriend");
    if (user) {
      let temp = JSON.parse(user);
      return temp.firstName;
    }
    return {};
  }

  public getFriendLastname(): any {
    const user = window.sessionStorage.getItem("clickedFriend");
    if (user) {
      let temp = JSON.parse(user);
      return temp.lastName;
    }
    return {};
  }

  public getFriendIcon(): any {
    const user = window.sessionStorage.getItem("clickedFriend");
    if (user) {
      let temp = JSON.parse(user);
      return temp.imageURL;
    }
    return {};
  }

  public getFriendEmail(): any {
    const user = window.sessionStorage.getItem("clickedFriend");
    if (user) {
      let temp = JSON.parse(user);
      return temp.email;
    }
    return {};
  }

  public closeProfileComponet() {
    const profileModal = document.getElementById('profile-modal')
    // @ts-ignore
    profileModal.close()
  }
}
