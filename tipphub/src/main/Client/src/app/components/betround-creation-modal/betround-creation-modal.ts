import { Component, OnInit } from "@angular/core";
import { BetroundService } from "../../Service/betround.service";
import { Betround } from "../../Model/Betround";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
  betroundCSVValidator = new FormControl("", [Validators.required]);
  betroundLogoImageValidator = new FormControl("", [Validators.required]);
  betroundNumberOfGameDaysValidator = new FormControl("", [
    Validators.required,
  ]);
  betroundDateOfGameValidator = new FormControl("", [Validators.required]);
  betroundTeamOneValidator = new FormControl("", [Validators.required]);
  betroundTeamTwoValidator = new FormControl("", [Validators.required]);

  betroundCreationValidationForm = new FormGroup({
    betroundName: this.betroundNameValidator,
    csvFile: this.betroundCSVValidator,
    password: this.betroundLogoImageValidator,
  });

  constructor(private betroundService: BetroundService) {
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
}
