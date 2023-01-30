import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/Service/auth.service";
import { StorageService } from "src/app/Service/storage.service";
import { BetroundService } from "src/app/Service/betround.service";
import { UserService } from "src/app/Service/user.service";
import { ChartType } from "../apex.model";
import { ApexChart } from "ng-apexcharts";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnInit {
  currentUser: number | undefined;
  barChart!: ChartType;
  showAdminData: boolean = false;
  routeId: string | null = "";
  routeNumId: number = 0;
  chartData!: Set<Map<string, number>>;
  chartLabels: string[] = [];

  chartDetails: ApexChart = {
    type: "bar",
    toolbar: {
      show: true,
    },
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
    if (this.authService.isVerified()) {
      this.showAdminData = this.storageService.isCurrentUserAdmin();
    }
    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }
    this.getBarChartData();
    if (this.chartData) {
      const keys = new Set<string>();
      this.chartData.forEach((map) => {
        map.forEach((_, key) => keys.add(key));
      });
      this.chartLabels = Array.from(keys);
    }
    console.log(this.chartLabels);
  }

  public getBarChartData() {
    this.betroundService
      .getBetAmountPerUserInRound(this.routeNumId)
      .subscribe((data) => {
        this.chartData = data;
      });
  }
}
