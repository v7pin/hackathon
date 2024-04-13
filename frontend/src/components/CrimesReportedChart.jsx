import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CrimesReportedChart = () => {
  const data = {
    labels: ['September', 'October', 'November', 'December', 'January', 'February', 'March'],
    datasets: [
      {
        label: 'Reports',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CrimesReportedChart;
