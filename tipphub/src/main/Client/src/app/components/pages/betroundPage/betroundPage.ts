import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Betround } from "src/app/Model/Betround";
import { User } from "src/app/Model/User";
import { BetroundService } from "src/app/Service/betround.service";
import { StorageService } from "src/app/Service/storage.service";
import { UserService } from "src/app/Service/user.service";

@Component({
  selector: "betroundPage",
  templateUrl: "./betroundPage.html",
})
export class betroundPage implements OnInit {
  searchText = "";
  betrounds: Betround[] | undefined;
  currentUser: User = new User();
  passwordInput: String = "";

  constructor(
    private betroundService: BetroundService,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserById(this.storageService.getLoggedUser())
      .subscribe((data) => {
        this.currentUser = data;
      });
    this.betroundService.getAllBetrounds().subscribe((data) => {
      this.betrounds = data;
      for (let i = 0; i < this.betrounds.length; i++) {
        this.betroundService
          .getAllParticipants(this.betrounds[i].id)
          .subscribe((users) => {
            for (let j = 0; j < users.length; j++) {
              if (users[j].id == this.currentUser.id) {
                // @ts-ignore
                this.betrounds[i].containsCurrentUser = true;
              }
            }
          });
      }
    });
  }

  joinBetround(targetId: number | undefined) {
    this.betroundService
      .addUserToBetround(targetId, this.storageService.getLoggedUser())
      .subscribe();
    this.router.navigateByUrl("/betround-details/" + targetId);
  }

  betsManagementClick($event: Event) {
    $event.preventDefault();
    this.router.navigateByUrl("/bets-management");
  }

  checkPassword(password: String | undefined, targetId: number | undefined) {
    if (password == this.passwordInput) {
      this.joinBetround(targetId);
    } else if (!this.passwordInput) {
      window.alert("Bitte gib ein Passwort ein.");
    } else {
      window.alert("Falsches Password.");
    }
  }
}
