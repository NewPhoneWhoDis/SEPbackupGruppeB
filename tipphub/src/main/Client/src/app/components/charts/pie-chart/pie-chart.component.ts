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
  chartSeries: ApexNonAxisChartSeries = [];

  chartDetails: ApexChart = {
    type: "pie",
    toolbar: {
      show: true,
    },
  };

  chartTitle: ApexTitleSubtitle = {
    text: "Erzielte Punkte/Mannschaft",
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
          console.log(this.currentUser);
          this.getBarChartData();
        });
    }
    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }
  }

  public getBarChartData() {
    this.betroundService
      .getKeyPieDiagram(this.currentUser, this.routeNumId)
      .subscribe((data) => {
        this.chartLabels = data;
      });
    this.betroundService
      .getValuesPieDiagram(this.currentUser, this.routeNumId)
      .subscribe((data) => {
        this.chartSeries = data;
      });
  }
}
