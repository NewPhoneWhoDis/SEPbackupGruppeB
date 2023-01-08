import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Service/auth.service";
import { StorageService } from "src/app/Service/storage.service";
import { ChartType } from "./apex.model";

import { basicColumChart, simplePieChart, barChart } from "./data";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"],
})
export class StatisticsPageComponent implements OnInit {
  basicColumChart!: ChartType;
  simplePieChart!: ChartType;
  barChart!: ChartType;
  showAdminData: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isVerified()) {
      this.showAdminData = this.storageService.isCurrentUserAdmin();
    }
    this._fetchData();
  }

  private _fetchData() {
    this.basicColumChart = basicColumChart;
    this.simplePieChart = simplePieChart;
    this.barChart = barChart;
  }
}
