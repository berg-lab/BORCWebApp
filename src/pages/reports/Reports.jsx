import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './reports.css'; // Import CSS file

const Reports = () => {
  const [reports, setReportsData] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.9:5000/thermal/20');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setReportsData(data.results[0].series[0].values);
      } catch (error) {
        console.error('Error fetching thermal data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reports) {
      if (chart) {
        updateChart();
      } else {
        renderChart();
      }
    }
  }, [reports]);

  const renderChart = () => {
    const ctx = document.getElementById('thermalChart').getContext('2d');
    const labels = reports.map(([time]) => new Date(time).toLocaleString());
    const temperatures = reports.map(([, temperature]) => temperature);
    const humidities = reports.map(([, , humidity]) => humidity);

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°F)',
            data: temperatures,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
          {
            label: 'Humidity (%)',
            data: humidities,
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5,     // Set the step size of the axis to 5 units
            },

          },
        },
      },
    });

    setChart(newChart);
  };

  const updateChart = () => {
    const labels = reports.map(([time]) => new Date(time).toLocaleString());
    const temperatures = reports.map(([, temperature]) => temperature);
    const humidities = reports.map(([, , humidity]) => humidity);

    chart.data.labels = labels;
    chart.data.datasets[0].data = temperatures;
    chart.data.datasets[1].data = humidities;
    chart.update();
  };

  return (
    <div className="reports-container">
      <h1 className="reports-title">Thermal Data</h1>
      <canvas id="thermalChart" width="800" height="400"></canvas>
    </div>
  );
};

export default Reports;
