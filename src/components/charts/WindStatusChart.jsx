import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const WindStatusChart = ({ windDirection }) => {
  // Compass directions mapped to their respective degrees
  const directionLabels = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const degrees = [0, 45, 90, 135, 180, 225, 270, 315];

  // Data for the chart: highlight the direction closest to the windDirection
  const data = {
    labels: directionLabels,
    datasets: [
      {
        label: 'Wind Direction',
        data: degrees.map(degree => (Math.abs(degree - windDirection) < 22.5 ? 1 : 0)), // Highlight the closest direction
        backgroundColor: degrees.map(degree => 
          Math.abs(degree - windDirection) < 22.5 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(0, 0, 0, 0.1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: {
        display: false, // Hide the ticks
      },
      gridLines: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '210px', height: '250px', margin: '0 auto' }}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default WindStatusChart;
