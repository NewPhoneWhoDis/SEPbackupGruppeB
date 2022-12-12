import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistComponent} from "../friendslist/friendslist.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  clickedFriend : User | undefined;
  constructor(private friendsListComponent : FriendslistComponent) {
  }

  ngOnInit(): void {
    if(this.friendsListComponent.clickedFriend){
      this.clickedFriend = this.friendsListComponent.clickedFriend;
      console.log(this.clickedFriend)
    }
  }

}
