import { Component, OnInit } from "@angular/core";
import { Subscriber, Observable } from "rxjs";
import { League } from "../../Model/League";
import { LeagueService } from "../../Service/league.service";
import { Game } from "../../Model/Game";

@Component({
  selector: "app-league-update",
  templateUrl: "./league-update.component.html",
  styleUrls: ["./league-update.component.css"],
})
export class LeagueUpdateComponent implements OnInit {
  league: League;
  newName = "";
  newLogoURL = "";
  game: Game;
  leagues: League[] | undefined;

  constructor(private leagueService: LeagueService) {
    this.league = new League();
    this.game = new Game();
  }

  ngOnInit(): void {
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });
  }

  onSubmit() {
    if (this.leagues) {
      for (let league of this.leagues) {
        if (league.name === this.league.name) {
          if (league.id) {
            let newLeague = new League();
            newLeague.name = this.newName;
            newLeague.logoURL = this.newLogoURL;
            this.leagueService.changeNameAndLogo(league.id, newLeague).subscribe((data) => {
              console.log(newLeague);
              window.location.reload();
            });
            return;
          }
        }
      }
    }
  }

  onSubmitAddGame(){
    if (this.leagues){
      for(let league of this.leagues){
        if(league.name == this.league.name){
          if(league.id){
            this.leagueService.addGame(league.id,this.game).subscribe(
                () => {
                  window.location.reload();
                }
            );
          }
        }
      }
    }
  }

  onSubmitDeleteGame(){
    if (this.leagues){
      for(let league of this.leagues){
        for(let gameday of league.gameSchedule.gamedayList){
          for(let currentGame of gameday.games){
            if(currentGame.date == this.game.date &&
                currentGame.awayTeam == this.game.awayTeam &&
                currentGame.homeTeam == this.game.homeTeam){
              if(currentGame.id){
                this.leagueService.deleteGame(currentGame.id).subscribe(
                    () =>{
                      window.location.reload();
                    }
                );
              }
            }
          }
        }
      }
    }
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

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      
      this.newLogoURL = d;
    });
  }

  saveImage($event: any): void {
    const file = $event.srcElement.files[0];
    this.convertToBase64(file);
  }
}
