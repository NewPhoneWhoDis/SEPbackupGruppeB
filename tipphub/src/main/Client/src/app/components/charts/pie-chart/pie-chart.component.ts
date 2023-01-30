import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { AuthService } from "src/app/Service/auth.service";
import { BetroundService } from "src/app/Service/betround.service";
import { StorageService } from "src/app/Service/storage.service";
import { UserService } from "src/app/Service/user.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit {
  currentUser: number | undefined;
  routeId: string | null = "";
  routeNumId: number = 0;
  chartData!: Set<Map<string, number>>;
  chartLabels: string[] = [];
  chartSeries: ApexNonAxisChartSeries = [40, 32, 28, 55];

  chartDetails: ApexChart = {
    type: "pie",
    toolbar: {
      show: true,
    },
  };

  chartTitle: ApexTitleSubtitle = {
    text: "Leading Companies",
    align: "center",
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true,
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService,
    private betroundService: BetroundService
  ) {}

  ngOnInit(): void {
    if (this.authService.isVerified()) {
      this.userService
        .getUserById(this.storageService.getLoggedUser())
        .subscribe((data) => {
          this.currentUser = data.id;
        });
    }
    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }
    this.getBarChartData();
  }
  public getBarChartData() {
    this.betroundService
      .getBetAmountPerUserInRound(this.routeNumId)
      .subscribe((data) => {
        this.chartData = data;
        this.setChartLabels();
      });
    console.log(this.chartLabels);
  }

  private setChartLabels() {
    if (this.chartData) {
      const keys = new Set<string>();
      this.chartData.forEach((map) => {
        map.forEach((_, key) => keys.add(key));
      });
      this.chartLabels = Array.from(keys);
    }
  }
}
