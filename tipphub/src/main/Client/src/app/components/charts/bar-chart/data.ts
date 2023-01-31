import { ChartType } from "../apex.model";

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
      data: getSeries(),
    },
  ],
  colors: ["#f28c18"],
  xaxis: {
    // tslint:disable-next-line: max-line-length
    categories: getCategories(),
  },
  grid: {
    borderColor: "#c2c2c2",
    padding: {
      bottom: 5,
    },
  },
};

function getSeries() {
  const series = window.sessionStorage.getItem("chartseries");
  if (series) {
    let temp = JSON.parse(series);
    return temp;
  }
  return {};
}

function getCategories() {
  const categories = window.sessionStorage.getItem("chartlabels");
  if (categories) {
    let temp = JSON.parse(categories);
    return temp;
  }
  return {};
}

export { barChart };
