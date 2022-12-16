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
    this.betroundService.getAllBetrounds().subscribe((data) => {
      this.betrounds = data;
      console.log(data);
    });
    this.userService
      .getUserById(this.storageService.getLoggedUser())
      .subscribe((data) => {
        this.currentUser = data;
      });
  }

  joinBetround(targetId: number | undefined) {
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
