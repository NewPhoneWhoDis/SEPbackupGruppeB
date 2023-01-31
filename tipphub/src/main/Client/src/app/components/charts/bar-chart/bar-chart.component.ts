import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApexNonAxisChartSeries } from "ng-apexcharts";
import { AuthService } from "src/app/Service/auth.service";
import { BetroundService } from "src/app/Service/betround.service";
import { StorageService } from "src/app/Service/storage.service";
import { UserService } from "src/app/Service/user.service";
import { ChartType } from "../apex.model";
import { barChart } from "./data";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnInit {
  barChart!: ChartType;
  currentUser: number | undefined;
  routeId: string | null = "";
  routeNumId: number = 0;
  chartData!: Set<Map<string, number>>;
  chartLabels: string[] = [];
  chartSeries: ApexNonAxisChartSeries = [];
  static chartSeries: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService,
    private betroundService: BetroundService
  ) {}

  ngOnInit() {
    if (this.authService.isVerified()) {
      this.userService
        .getUserById(this.storageService.getLoggedUser())
        .subscribe((data) => {
          this.currentUser = data.id;
          console.log(this.currentUser);
          this.getBarChartData();
        });
    }
    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }
    this._fetchData();
  }
  public getBarChartData() {
    this.betroundService.getKeyBarDiagram(this.routeNumId).subscribe((data) => {
      this.chartLabels = data;
      sessionStorage.setItem("chartlabels", JSON.stringify(this.chartLabels));
    });
    this.betroundService
      .getValuesBarDiagram(this.routeNumId)
      .subscribe((data) => {
        this.chartSeries = data;
        sessionStorage.setItem("chartseries", JSON.stringify(this.chartSeries));
      });
  }

  private _fetchData() {
    this.barChart = barChart;
  }
}
