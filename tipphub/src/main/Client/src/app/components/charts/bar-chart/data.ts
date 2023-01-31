import { ChartType } from "../apex.model";
import { BarChartComponent as bar } from "./bar-chart.component";

const barChart: ChartType = {
  chart: {
    height: 350,
    type: "bar",
    toolbar: {
      show: true,
    },
  },
  tooltip: {
    enabled: false,
    style: {
      colors: "f1f1f1",
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: true,
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
  colors: ["#f28c18"],
  xaxis: {
    // tslint:disable-next-line: max-line-length
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
  grid: {
    borderColor: "#c2c2c2",
    padding: {
      bottom: 5,
    },
  },
};

export { barChart };
