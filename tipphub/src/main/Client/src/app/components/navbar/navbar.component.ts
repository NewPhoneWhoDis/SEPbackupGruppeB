import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { RegistrationService } from "../../Service/registration.service";
import { HubSystemService } from "../../Service/hub-system.service";
import { League } from "../../Model/League";
import { LeagueService } from "../../Service/league.service";
import { User } from "../../Model/User";
import { UserService } from "../../Service/user.service";
import { StorageService } from "../../Service/storage.service";
import { AuthService } from "../../Service/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  systemDate: Date | undefined;
  leagues: League[] | undefined;
  currentUser: User | undefined;
  showButtons: boolean = false;
  balance: number = 0;

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
    private leagueService: LeagueService,
    private userService: UserService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.hubSystemService.getSystemDate().subscribe((data) => {
      this.systemDate = data;
    });
    this.leagueService.getAllLeagues().subscribe((data) => {
      this.leagues = data;
    });
    if (this.authService.isVerified()) {
      this.userService
        .getUserById(this.storageService.getLoggedUser())
        .subscribe((data) => {
          this.currentUser = data;
        });
      this.showButtons = true;
      console.log(this.currentUser);
    }
  }
}
