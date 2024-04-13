// RiskClassificationChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useRef, useEffect } from 'react';

const RiskClassificationChart = () => {

  const chartRef = useRef(null);

  useEffect(() => {
    // When the component unmounts
    return () => {
      const chart = chartRef.current;
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  
  const data = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        label: 'Frequency',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90],
      },
    ],
  };

  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  };

  return <Radar ref={chartRef} data={data} options={options} />;
};

export default RiskClassificationChart;
