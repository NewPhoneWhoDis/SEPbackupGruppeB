import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistComponent} from "../friendslist/friendslist.component";
import {UserService} from "../../Service/user.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  clickedFriend : User | undefined;
  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
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
}
