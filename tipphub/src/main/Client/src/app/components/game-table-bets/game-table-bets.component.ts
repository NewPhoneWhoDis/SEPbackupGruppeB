import { Component, OnInit } from "@angular/core";
import { League } from "../../Model/League";
import { Game } from "../../Model/Game";
import { LeagueService } from "../../Service/league.service";
import { HubSystemService } from "../../Service/hub-system.service";
import { BetroundService } from "../../Service/betround.service";
import { Bet } from "../../Model/Bet";
import { StorageService } from "../../Service/storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/Model/User";
import { UserService } from "../../Service/user.service";
import { data } from "autoprefixer";
import { Team } from "../../Model/Team";

@Component({
  selector: "app-game-table-bets",
  templateUrl: "./game-table-bets.component.html",
  styleUrls: ["./game-table-bets.component.css"],
})
export class GameTableBetsComponent implements OnInit {
  leagues: League[] | undefined;
  leaguesWithGames = new Map<League, Game[]>();
  systemDate: Date | undefined;
  bet: Bet = new Bet();
  gameBetHelp: Game = new Game();
  leagueWithTops: League = new League();
  currentUser: User = new User();
  tippsResult: string = "";
  showOvertakeButton: boolean = false;
  showButtons: boolean = true;
  routeId: string | null = "";
  routeNumId: number = 0;
  leaugeId: number = 0;
  leagueTable: boolean = false;
  disabledHomeTeam: boolean = false;
  disabledAwayTeam: boolean = false;
  disabledDraw: boolean = false;
  teams: Array<Team> = new Array();
  homeTeamOdd: number | undefined;
  awayTeamOdd: number | undefined;
  drawOdd: number | undefined;

  constructor(
    private leagueService: LeagueService,
    private hubSystemService: HubSystemService,
    private betroundService: BetroundService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
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
    if (this.router.url === "/ligen-management") {
      this.showButtons = false;
      this.leagueTable = true;
    }
    if (this.router.url.includes("betTable")) {
      this.betroundService.getLeagueId(this.routeNumId).subscribe((data) => {
        this.leaugeId = data;
      });
    }
    this.hubSystemService.getSystemDate().subscribe((data) => {
      this.systemDate = data;
    });
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
      for (let m = 0; m < this.leagues.length; m++) {
        if (!this.leagueTable && this.leagues[m].id != this.leaugeId) {
          continue;
        }
        this.leagueService.getAllTeams(this.leagues[m].id).subscribe((data) => {
          // @ts-ignore
          this.leagues[m].teams = data;
        });
        console.log(this.leagues[m]);
        this.betroundService
          .getBestBetters(this.leagues[m].id)
          .subscribe((data) => {
            // @ts-ignore
            this.leagues[m].topBetters = data;
            // @ts-ignore
            if (this.leagues[m].topBetters.length < 3) {
              // @ts-ignore
              if (this.leagues[m].topBetters.length < 3) {
                // @ts-ignore
                this.leagues[m].topBetters.push("", "", "");
              }
            }
          });
        this.betroundService
          .getBestTeams(this.leagues[m].id)
          .subscribe((data) => {
            // @ts-ignore
            this.leagues[m].topTeams = data;
          });
        let games = new Array<Game>();
        for (
          let i = 0;
          i < this.leagues[m].gameSchedule.gamedayList.length;
          i++
        ) {
          for (
            let j = 0;
            j < this.leagues[m].gameSchedule.gamedayList[i].games.length;
            j++
          ) {
            this.leagues[m].gameSchedule.gamedayList[i].games[j].round =
              this.leagues[m].gameSchedule.gamedayList[i].round;
            // @ts-ignore
            if (
              //@ts-ignore
              new Date(this.systemDate).getTime() <
              new Date(
                //@ts-ignore
                this.leagues[m].gameSchedule.gamedayList[i].games[j].date
              ).getTime()
            ) {
              this.leagues[m].gameSchedule.gamedayList[i].games[
                j
              ].scoreAwayTeam = undefined;
              this.leagues[m].gameSchedule.gamedayList[i].games[
                j
              ].scoreHomeTeam = undefined;
            }
            games.push(this.leagues[m].gameSchedule.gamedayList[i].games[j]);
          }
        }
        this.leaguesWithGames.set(this.leagues[m], games);
      }
    });
  }

  showPopUp(game: Game) {
    this.showOvertakeButton = false;
    this.tippsResult = "";
    this.bet.homeTeam = game.homeTeam;
    this.bet.awayTeam = game.awayTeam;
    this.bet.dateOfBet = this.systemDate;
    this.bet.dateOfGame = game.date;
    this.homeTeamOdd = game.homeTeamOdd;
    this.awayTeamOdd = game.awayTeamOdd;
    this.drawOdd = game.drawOdd;
    // show popup tipp übernehmen
    for (let bet of this.currentUser.bets) {
      if (
        bet.homeTeam === this.bet.homeTeam &&
        bet.awayTeam === this.bet.awayTeam &&
        bet.dateOfGame === this.bet.dateOfGame &&
        bet.betround?.id != this.routeNumId
      ) {
        this.showOvertakeButton = true;
        this.tippsResult =
          (bet.homeTeamScore?.toString() as string) +
          "-" +
          bet.awayTeamScore?.toString();
      }
    }
  }

  betInRound(withMoney: boolean): void {
    if (withMoney) {
      this.bet.moneyBet = true;
    }
    this.betroundService
      .betInRound(
        this.storageService.getLoggedUser(),
        this.routeNumId,
        this.bet
      )
      .subscribe(
        () => {
          window.alert("Wette wurde erfolgreich platziert!");
          location.reload();
        },
        () => {
          window.alert("Du hast kein Geld, du Geringverdiener!!!");
          location.reload();
        }
      );
  }

  getBetHelp(gameId: number | undefined): void {
    if (gameId != null) {
      this.betroundService.getBetHelp(gameId).subscribe((data) => {
        this.gameBetHelp = data;
      });
    }
  }

  showTops(league: League) {
    this.leagueWithTops.topBetters = league.topBetters;
    this.leagueWithTops.topTeams = league.topTeams;
  }

  overtakeBet(result: string) {
    let results = result.split("-");
    this.bet.homeTeamScore = Number(results[0]);
    this.bet.awayTeamScore = Number(results[1]);
  }

  checkSelected() {
    this.disabledHomeTeam = false;
    this.disabledAwayTeam = false;
    this.disabledDraw = false;
    if (this.bet.homeTeamWinner) {
      this.disabledDraw = true;
      this.disabledAwayTeam = true;
    }
    if (this.bet.awayTeamWinner) {
      this.disabledDraw = true;
      this.disabledHomeTeam = true;
    }
    if (this.bet.draw) {
      this.disabledAwayTeam = true;
      this.disabledHomeTeam = true;
    }
  }

  showTeamTable(league: League) {
    this.teams = league.teams;
  }
}
