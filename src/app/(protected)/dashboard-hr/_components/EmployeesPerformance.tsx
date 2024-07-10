"use client";
import React, { PureComponent } from "react";
import ReactApexChart from "react-apexcharts";

import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Heures visionnées",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default function EmployeesPerformance() {
  const options = {
    chart: {
      type: "bar" as const,
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 10, // Added borderRadius property
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Employé 1", "Employé 2", "Employé 3", "Employé 4"],
      // Set the color to a lighter grey
    },
    grid: {
      borderColor: "#f2f4f7",
    },
    yaxis: {
      title: {
        text: "Classement employés",
        floating: true,
      },
      axisBorder: {
        width: 120,
      },
    },
    colors: ["#DE3A11", "#F9703E", "#FFB088", "#eaecf0", "#775DD0"],
    legend: {
      position: "bottom",
      offsetY: 10,
    },
  };

  const series = [
    {
      name: "Heures visionnées",
      data: [100, 80, 120, 90],
    },
    {
      name: "Interactions",
      data: [200, 150, 180, 80],
    },
    {
      name: "Séances d'entraînement",
      data: [50, 70, 60, 80],
    },

    {
      name: "Séances manquées",
      data: [50, 45, 28, 30],
    },
  ];
  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
}
