import { Component, OnInit } from "@angular/core";
import { BetroundService } from "../../Service/betround.service";
import { User } from "../../Model/User";
import { UserService } from "../../Service/user.service";
import { StorageService } from "../../Service/storage.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.css"],
})
export class ScoreboardComponent implements OnInit {
  currentUser: User | undefined;
  participants: Array<User> | undefined;
  routeId: string | null = "";
  routeNumId: number = 0;
  points: Array<number> = new Array<number>();
  constructor(
    private betroundService: BetroundService,
    private userService: UserService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserById(this.storageService.getLoggedUser())
      .subscribe((data) => {
        this.currentUser = data;
      });

    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }

    this.betroundService
      .getAllParticipants(this.routeNumId)
      .subscribe((data) => {
        this.participants = data;

        for (let i = 0; i < this.participants.length; i++) {
          // @ts-ignore
          this.betroundService
            //@ts-ignore
            .getEvaluationInRound(this.participants[i].id, this.routeNumId)
            .subscribe((data) => {
              this.points?.push(data);
            });
        }
      });
  }

  setClickedUser(user: User) {
    this.storageService.saveClickedUser(user);
  }
}
