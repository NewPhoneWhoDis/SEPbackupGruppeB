import { Component, OnInit } from "@angular/core";
import { BetroundService } from "../../Service/betround.service";
import { Betround } from "../../Model/Betround";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LeagueService } from "src/app/Service/league.service";
import { League } from "src/app/Model/League";
import { UserService } from "src/app/Service/user.service";
import { StorageService } from "src/app/Service/storage.service";
import { User } from "src/app/Model/User";

@Component({
  selector: "betround-creation-modal",
  templateUrl: "./betround-creation-modal.html",
  styleUrls: ["./betround-creation-modal.css"],
})
export class BetroundCreationModalComponent implements OnInit {
  betround: Betround;
  leagues: League[] | undefined;
  league: League = new League();
  currentUser: User = new User();

  constructor(
    private betroundService: BetroundService,
    private userService: UserService,
    private leagueService: LeagueService,
    private storageService: StorageService
  ) {
    this.betround = new Betround();
  }

  ngOnInit(): void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });

    this.userService
      .getUserById(this.storageService.getLoggedUser())
      .subscribe((data) => {
        this.currentUser = data;
      });
  }

  onSubmit() {
    if (this.leagues) {
      for (let league of this.leagues) {
        if (league.name === this.league.name) {
          if (league.id) {
            // @ts-ignore
            if (!this.betround.password) {
              this.betround.isPublic = true;
            }
            this.betroundService
              .addNewBetround(league, this.currentUser, this.betround)
              .subscribe((data: any) => {
                this.betround = data;
                window.location.reload();
              });
          }
        }
      }
    }
  }
}
