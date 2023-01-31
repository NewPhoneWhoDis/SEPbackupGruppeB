import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as ApexCharts from "apexcharts";
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartType,
} from "ng-apexcharts";
import { AuthService } from "src/app/Service/auth.service";
import { BetroundService } from "src/app/Service/betround.service";
import { StorageService } from "src/app/Service/storage.service";
import { UserService } from "src/app/Service/user.service";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"],
})
export class BarChartComponent implements OnInit {
  currentUser: number | undefined;
  routeId: string | null = "";
  routeNumId: number = 0;
  chartData!: Set<Map<string, number>>;
  chartLabels: string[] = [];
  chartSeries: number[] = [];

  chartDetails: ApexChart = {
    type: "bar",
    toolbar: {
      show: true,
    },
  };

  xaxis: ApexXAxis = {
    categories: this.chartLabels,
  };

  chartPlotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true,
    },
  };

  chartDataLabels: ApexDataLabels = {
    enabled: false,
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
          this.getBarChartData();
        });
    }
    this.routeId = this.route.snapshot.paramMap.get("id");
    if (this.routeId) {
      this.routeNumId = +this.routeId;
    }
    this.renderChart(this.chartLabels, this.chartSeries, "bar", "barchart");
  }

  public getBarChartData() {
    this.betroundService.getKeyBarDiagram(this.routeNumId).subscribe((data) => {
      this.chartLabels = data;
    });
    this.betroundService
      .getValuesBarDiagram(this.routeNumId)
      .subscribe((data) => {
        this.chartSeries = data;
      });
  }

  public renderChart(labeldata: any, maindata: any, type: any, id: any) {
    const myChart = new ApexCharts(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: "# of Votes",
            data: maindata,

            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
