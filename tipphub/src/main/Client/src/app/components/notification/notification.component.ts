import { Component, OnInit } from "@angular/core";
import { User } from "../../Model/User";
import { StorageService } from "../../Service/storage.service";
import { UserService } from "../../Service/user.service";
import { FriendslistService } from "../../Service/friendslist.service";
import { Bet } from "../../Model/Bet";
import { NotificationService } from "../../Service/notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  currentUser: User | undefined;
  bets: Array<Bet> | undefined;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private friendslistService: FriendslistService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserById(this.storageService.getLoggedUser())
      .subscribe((data) => {
        this.currentUser = data;

        this.bets = this.currentUser.notification?.sharedBets;
      });
  }

  processFriendRequest(friendRequestId: number, add: boolean) {
    this.friendslistService
      .processFriendRequest(this.currentUser?.id, friendRequestId, add)
      .subscribe();
    window.location.reload();
  }

  processBetPermission(betPermissionId: number, permit: boolean) {
    this.notificationService
      .processBetPermission(betPermissionId, permit)
      .subscribe();
    window.location.reload();
  }
}
