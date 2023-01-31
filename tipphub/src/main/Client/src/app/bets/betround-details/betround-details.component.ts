import { StorageService } from "src/app/Service/storage.service";
import { UserService } from "./../../Service/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Betround } from "src/app/Model/Betround";
import { User } from "src/app/Model/User";
import { BetroundService } from "src/app/Service/betround.service";

@Component({
  selector: "app-betround-details",
  templateUrl: "./betround-details.component.html",
  styleUrls: ["./betround-details.component.css"],
})
export class BetroundDetailsComponent implements OnInit {
  searchedUserBetInvite: string = "";
  matchedUser: User | undefined;
  currentUser: User | undefined;
  routeId: string | null = "";
  routeNumId: number = 0;
  betrounds: Betround[] | undefined;
  participantsBetround: Array<User | undefined> | undefined;
  betroundToShow: Betround = new Betround();
  nameToChange: string = "";
  userLogged: User | undefined = new User();
  nicknameInBetround: string = "";

  constructor(
    private route: ActivatedRoute,
    private betroundService: BetroundService,
    private userService: UserService,
    private storage: StorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.betroundService.getAllBetrounds().subscribe((data) => {
      this.betrounds = data;
    });

    this.betroundService
      .getAllParticipants(this.routeNumId)
      .subscribe((data) => {
        this.participantsBetround = data;
      });

    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }

    this.betroundService.getAllBetrounds().subscribe((data) => {
      return data.map((betround) => {
        if (betround.id === this.routeNumId) this.betroundToShow = betround;
        return betround;
      });
    });

    this.userService
      .getUserById(this.storage.getLoggedUser())
      .subscribe((data) => {
        this.currentUser = data;
      });

    this.betroundService
      .getNickname(this.storage.getLoggedUser(), this.routeNumId)
      .subscribe((data) => {
        this.nicknameInBetround = data;
      });
  }

  sendBetroundInvite(email: string): void {
    this.userService.getUserByEmail(email).subscribe((data) => {
      this.matchedUser = data;
      if (this.userService.getUserById(this.matchedUser?.id)) {
        this.betroundService
          .sendEmailInviteBetround(
            this.routeNumId,
            this.matchedUser.id as number
          )
          .subscribe();
        window.location.reload();
      }
    });
  }

  changeName($event: Event, nameChange: string) {
    $event.preventDefault();

    this.betroundService
      .setNickname(this.currentUser?.id as number, this.routeNumId, nameChange)
      .subscribe();
    window.location.reload();
  }
}
