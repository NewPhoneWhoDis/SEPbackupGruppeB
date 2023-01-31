import { Component, OnInit } from "@angular/core";
import { LeagueService } from "../../Service/league.service";
import { League } from "../../Model/League";
import { NgxCsvParser, NgxCSVParserError } from "ngx-csv-parser";
import { Observable, Subscriber } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-league-creation-modal",
  templateUrl: "./league-creation-modal.component.html",
  styleUrls: ["./league-creation-modal.component.css"],
})
export class LeagueCreationModalComponent implements OnInit {
  league: League;
  csvRecords: any;
  header: boolean = false;

  leagueNameValidator = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
  ]);
  leagueCSVValidator = new FormControl("", [Validators.required]);
  leagueLogoImageValidator = new FormControl("", [Validators.required]);
  leagueNumberOfGameDaysValidator = new FormControl("", [Validators.required]);
  leagueDateOfGameValidator = new FormControl("", [Validators.required]);
  leagueTeamOneValidator = new FormControl("", [Validators.required]);
  leagueTeamTwoValidator = new FormControl("", [Validators.required]);

  leagueCreationValidationForm = new FormGroup({
    leagueName: this.leagueNameValidator,
    csvFile: this.leagueCSVValidator,
    logoImage: this.leagueLogoImageValidator,
  });

  gamePlanCreationValidationForm = new FormGroup({
    numberOfGamedays: this.leagueNumberOfGameDaysValidator,
    dateOfGame: this.leagueDateOfGameValidator,
    teamOne: this.leagueTeamOneValidator,
    teamTwo: this.leagueTeamTwoValidator,
  });

  constructor(
    private leagueService: LeagueService,
    private ngxCsvParser: NgxCsvParser
  ) {
    this.league = new League();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.league = this.leagueService.addGameSchedule(
      this.league,
      this.csvRecords
    );
    this.leagueService.addNewLeague(this.league).subscribe((data) => {
      this.league = data;
      window.location.reload();
    });
  }

  closePopUp() {
    this.leagueService.togglePopUp();
  }

  isPopUpOpen() {
    return this.leagueService.isPopUpOpen();
  }

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header =
      (this.header as unknown as string) === "true" || this.header === true;
    this.ngxCsvParser
      .parse(files[0], {
        header: this.header,
        delimiter: ",",
        encoding: "utf8",
      })
      .pipe()
      .subscribe({
        next: (result): void => {
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {},
      });
  }

  saveImage($event: any): void {
    const file = $event.srcElement.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      this.league.logoURL = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };
    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
}
