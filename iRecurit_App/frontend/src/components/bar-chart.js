import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      label: "2024",
      data: [0, 0, 0, 0, 2, 0, 3, 0, 4, 1, 6, 0],
      backgroundColor: "#E74C3C",
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 15,
      grid: {
        display: true,
        borderDash: [5, 5],
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  backgroundColor: "#E74C3C",
};

const BarChart = () => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#F6F7FF", padding: "10px", borderRadius: "10px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
