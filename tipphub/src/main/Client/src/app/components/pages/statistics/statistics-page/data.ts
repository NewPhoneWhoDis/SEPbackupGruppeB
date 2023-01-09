import { ChartType } from "./apex.model";

const basicColumChart: ChartType = {
  chart: {
    height: 350,
    type: "bar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: "rounded",
      columnWidth: "45%",
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  colors: ["#f28c18", "#723da5", "#52ab00"],
  series: [
    {
      name: "Net Profit",
      data: [46, 57, 59, 54, 62, 58, 64, 60, 66],
    },
    {
      name: "Revenue",
      data: [74, 83, 102, 97, 86, 106, 93, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [37, 42, 38, 26, 47, 50, 54, 55, 43],
    },
  ],
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: "#f1f1f1",
  },
  tooltip: {
    y: {
      formatter: (val: string) => {
        return "$ " + val + " thousands";
      },
    },
  },
};

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
      data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365],
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

const simplePieChart: ChartType = {
  chart: {
    height: 320,
    type: "pie",
    toolbar: {
      show: true,
    },
  },
  series: [44, 55, 41, 17, 15],
  labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
  colors: ["#1cbb8c", "#5664d2", "#fcb92c", "#4aa3ff", "#ff3d60"],
  legend: {
    show: true,
    position: "bottom",
    horizontalAlign: "center",
    verticalAlign: "middle",
    floating: false,
    fontSize: "14px",
    offsetX: 0,
    offsetY: 0,
    labels: {
      colors: undefined,
      useSeriesColors: true,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 240,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
};

export { basicColumChart, barChart, simplePieChart };
