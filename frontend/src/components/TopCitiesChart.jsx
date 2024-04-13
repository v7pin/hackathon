// TopCitiesChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useRef, useEffect } from 'react';

const TopCitiesChart = () => {

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
    labels: ['Bihar', 'Pune', 'Mumbai', 'Hyderabad', 'Delhi'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F77825'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F77825'],
      },
    ],
  };

  return <Pie ref={chartRef} data={data} />;
};

export default TopCitiesChart;
