import { Component, OnInit } from "@angular/core";
import { ChartType } from "./apex.model";

import {
  linewithDataChart,
  basicColumChart,
  columnlabelChart,
  lineColumAreaChart,
  basicRadialBarChart,
  simplePieChart,
  donutChart,
  barChart,
  splineAreaChart,
  dashedLineChart,
} from "./data";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"],
})
export class StatisticsPageComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  linewithDataChart!: ChartType;
  basicColumChart!: ChartType;
  columnlabelChart!: ChartType;
  lineColumAreaChart!: ChartType;
  basicRadialBarChart!: ChartType;
  simplePieChart!: ChartType;
  donutChart!: ChartType;
  barChart!: ChartType;
  splineAreaChart!: ChartType;
  dashedLineChart!: ChartType;

  constructor() {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Charts" },
      { label: "Apex charts", active: true },
    ];

    /**
     * Fethches the chart data
     */
    this._fetchData();
  }

  /**
   * Fetches the chart data
   */
  private _fetchData() {
    this.linewithDataChart = linewithDataChart;
    this.basicColumChart = basicColumChart;
    this.columnlabelChart = columnlabelChart;
    this.lineColumAreaChart = lineColumAreaChart;
    this.basicRadialBarChart = basicRadialBarChart;
    this.simplePieChart = simplePieChart;
    this.donutChart = donutChart;
    this.barChart = barChart;
    this.splineAreaChart = splineAreaChart;
    this.dashedLineChart = dashedLineChart;
  }
}
