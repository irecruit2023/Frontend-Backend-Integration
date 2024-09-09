import React, { useState,useEffect } from "react";
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary components for Chart.js
import { skillAnalysisData } from '../utils/util';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// sample data
const data = {
  labels: [
    'Coding',
    'Development',
    'c++',
    'Designing',
    'Java',
    'Python',
    'Machine learning'
  ],
  datasets: [
    {
      label: 'Student Average ',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'My Average',
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)',
    },
  ],
};


const RadarChart = () => {

  const [chartData, setChartData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    // Fetch data from API
    skillAnalysisData().then(data=>{
      console.log(data,"data")
      if(data){
        setChartData(data)
      }
    })
  }, []);


  const options = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
