import {Component, OnInit} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import {RegistrationService} from "../../Service/registration.service";
import {HubSystemService} from "../../Service/hub-system.service";
import {League} from "../../Model/League";
import {LeagueService} from "../../Service/league.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  systemDate: Date | undefined;
  leagues: League[] | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public registrationService: RegistrationService,
    private hubSystemService: HubSystemService,
    private leagueService: LeagueService
  ) {}

  ngOnInit(): void {
    this.hubSystemService.getSystemDate().subscribe((data) =>{this.systemDate = data});
    this.leagueService.getAllLeagues().subscribe(data => {this.leagues = data});
  }
}
