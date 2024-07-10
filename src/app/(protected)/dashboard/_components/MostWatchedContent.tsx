"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function MostAskedQuestions() {
  const options = {
    chart: {
      type: "pie" as const,
      height: 380,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
          labels: {
            show: true,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#DE3A11", "#F9703E", "#FF9466", "#FFB088", "#775DD0"],
    legend: {
      position: "bottom",
      offsetY: 0,
      containerMargin: {
        top: 140,
      },
    },
    series: [44, 55, 41, 17, 15],
    labels: ["Épaule", "Cervical", "Dorsal", "Stabilité", "Poignets"],
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="pie"
      height={410}
    />
  );
}
