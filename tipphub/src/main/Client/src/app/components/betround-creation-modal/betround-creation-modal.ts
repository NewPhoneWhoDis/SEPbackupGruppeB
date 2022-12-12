import { Component, OnInit } from "@angular/core";
import { BetroundService } from "../../Service/betround.service";
import { Betround } from "../../Model/Betround";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LeagueService } from "src/app/Service/league.service";

@Component({
  selector: "betround-creation-modal",
  templateUrl: "./betround-creation-modal.html",
  styleUrls: ["./betround-creation-modal.css"],
})
export class BetroundCreationModalComponent implements OnInit {
  betround: Betround;
  header: boolean = false;

  betroundNameValidator = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]);

  betroundCreationValidationForm = new FormGroup({
    betroundName: this.betroundNameValidator,
  });

  constructor(
    private betroundService: BetroundService,
    private leagueService: LeagueService
  ) {
    this.betround = new Betround();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.betroundService
      .addNewBetround(1, 1, this.betround)
      .subscribe((data: any) => {
        this.betround = data;
        window.location.reload();
      });
  }

  getLeagues() {
    console.table(this.leagueService.getAllLeagues);
  }
}
