import { Component, OnInit } from '@angular/core';
import {User} from "../../Model/User";
import {FriendslistService} from "../../Service/friendslist.service";

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {

  currentUser : User | undefined;
  friends : User[] | undefined;

  constructor(private friendslistService : FriendslistService) { }

  ngOnInit(): void {
    this.friendslistService.getAllFriends(this.currentUser?.id).subscribe(data =>{this.friends = data})
  }

}
