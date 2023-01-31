import { Observable } from "rxjs";
import { LeagueService } from "../../Service/league.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "betround-table",
  templateUrl: "./betround-table.component.html",
  styleUrls: ["./betround-table.component.css"],
})
export class BetroundTableComponent implements OnInit {
  appObservable = new Observable((observer) => {
    observer.next("1");
    observer.next("2");
    observer.next("3");
    observer.next("4");
  });

  constructor(public leagueService: LeagueService) {}

  ngOnInit(): void {
    this.appObservable.subscribe((val) => {});
  }
}
