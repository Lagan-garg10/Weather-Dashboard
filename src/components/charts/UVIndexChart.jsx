import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UVIndexChart = ({ uvIndex }) => {
  // Determine color based on UV index risk levels
  const getColorForUVIndex = (uvIndex) => {
    if (uvIndex <= 2) return '#3CB371';    // Low
    if (uvIndex <= 5) return '#FFD700';    // Moderate
    if (uvIndex <= 7) return '#FFA500';    // High
    if (uvIndex <= 10) return '#FF4500';   // Very High
    return '#FF0000';                      // Extreme (11+)
  };

  const data = {
    labels: ['UV Index', 'Max UV'], // UV Index and Remaining max value
    datasets: [
      {
        data: [uvIndex, 12 - uvIndex], // Current UV and remaining to max 12
        backgroundColor: [getColorForUVIndex(uvIndex), '#E0E0E0'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label === 'UV Index'
              ? 'UV Index: ' + uvIndex
              : 'Max UV: 12';
          },
        },
      },
    },
    circumference: 180, // Semi-circle gauge
    rotation: -90,
    cutout: '80%', // Creates the gauge effect
    aspectRatio: 2,
  };

  return (
      <Doughnut data={data} options={options} />
  );
};

export default UVIndexChart;
