import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const TopCrimesReportedChart = () => {
  const data = {
    labels: ['Robbery', 'Assault', 'Fighting', 'Road rage', 'Vandalism'],
    datasets: [
      {
        label: 'Top Crimes Reported',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#F77825',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#F77825',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default TopCrimesReportedChart;
