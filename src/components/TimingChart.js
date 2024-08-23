import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TimingChart = ({ prepTime, cookTime, totalTime }) => {
  const data = {
    labels: ["Prep Time", "Cook Time", "Total Time"],
    datasets: [
      {
        label: "Time (minutes)",
        data: [prepTime, cookTime, totalTime],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

TimingChart.propTypes = {
  prepTime: PropTypes.number.isRequired,
  cookTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default TimingChart;
