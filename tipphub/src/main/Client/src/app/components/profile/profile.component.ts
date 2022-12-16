import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistComponent} from "../friendslist/friendslist.component";
import {UserService} from "../../Service/user.service";
import {data} from "autoprefixer";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //idOfroute: string;
  routeId: string | null = '';
  routeNumId: number = 0;
  clickedFriend : User | undefined;
  constructor(private userService : UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id');
    if(this.routeId)
    this.routeNumId = +this.routeId;
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

  public sendInviteForBetround() {
    console.log(this.routeNumId)
  }
}
