"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function SessionsNotes() {
  const options = {
    chart: {
      type: "area" as const,
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FF4560", "#008FFB", "#F9703E"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: [
        "Janv",
        "Févr",
        "Mars",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Août",
        "Sept",
        "Oct",
        "Nov",
        "Déc",
      ],
    },
    yaxis: {
      title: {
        text: "Heures mesurées",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetX: -10,
    },
    series: [
      {
        name: "Activité physique enregistrées",
        data: [44, 55, 41, 67, 22, 43, 21, 49, 36, 52, 32, 60],
      },
      {
        name: "Nombre d'heures de vidéos de formation visionnées",
        data: [13, 23, 20, 8, 13, 27, 33, 12, 29, 18, 41, 24],
      },
      {
        name: "Engagement Horaire sur la Plateforme",
        data: [22, 17, 31, 9, 26, 15, 39, 11, 28, 35, 19, 42],
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={350}
    />
  );
}
