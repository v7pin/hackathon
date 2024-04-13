import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const NatureOfReportChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const data = {
      labels: ['Shoplifting', 'Purse snatching', 'Bicycle theft', 'Vandalism', 'Vehicle theft', 'Assault', 'Burglary', 'Robbery', 'Fighting', 'Road rage', 'Gun-pointing', 'Explosion', 'Shooting'],
      datasets: [
        {
          label: 'High',
          data: [12, 19, 3, 5, 2, 3, 14, 15, 10, 9, 5, 7, 8],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Medium',
          data: [15, 12, 13, 10, 9, 8, 11, 8, 7, 6, 4, 5, 3],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
        {
          label: 'Low',
          data: [8, 10, 15, 20, 30, 25, 22, 18, 12, 11, 7, 3, 2],
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Create or update the chart
    if (chartRef && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default NatureOfReportChart;
