import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Service/auth.service";
import { BetroundService } from "src/app/Service/betround.service";
import { StorageService } from "src/app/Service/storage.service";
import { ChartType } from "./apex.model";
import { BarChartComponent } from "src/app/components/charts/bar-chart/bar-chart.component";

import { basicColumChart, simplePieChart, barChart } from "./data";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  basicColumChart!: ChartType;
  simplePieChart!: ChartType;
  barChart!: ChartType;
  showAdminData: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private betroundService: BetroundService
  ) {}

  ngOnInit() {
    if (this.authService.isVerified()) {
      this.showAdminData = this.storageService.isCurrentUserAdmin();
    }
  }
}
