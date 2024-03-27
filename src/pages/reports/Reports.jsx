import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './reports.css'; // Import CSS file

const Reports = () => {
  const [nodeId, setNodeId] = useState('');
  const [reports, setReportsData] = useState(null);
  const [chart, setChart] = useState(null);
  const [batteryChart, setBatteryChart] = useState(null);

  const fetchData = async (nodeId) => {
    try {
      const response = await fetch(`http://192.168.0.9:5000/thermal/${nodeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setReportsData(data.results[0].series[0].values);
    } catch (error) {
      console.error('Error fetching thermal data:', error);
    }
  };

  useEffect(() => {
    fetchData(nodeId);
  }, [nodeId]);

  useEffect(() => {
    if (reports && !chart) {
      renderChart();
    } else if (chart) {
      updateChart();
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
              stepSize: 5,
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

  useEffect(() => {
    if (reports && !batteryChart) {
      renderBatteryChart();
    }
  }, [reports]);

  const renderBatteryChart = () => {
    const ctx = document.getElementById('batteryChart').getContext('2d');
    const labels = reports.map(([time]) => new Date(time).toLocaleString());
    const batteries = reports.map(([, , , battery]) => battery / 1000);

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Battery',
            data: batteries,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    setBatteryChart(newChart);
  };

  const handleSearch = () => {
    fetchData(nodeId);
  };

  return (
    <div className="reports-container">
      <h1 className="reports-title">Thermal Data</h1>
      <div className="searchBar">
        <input
          type="text"
          value={nodeId}
          onChange={(e) => setNodeId(e.target.value)}
          placeholder="Enter Node ID"
          className="searchInput"
        />
      </div>
      <canvas id="thermalChart" width="800" height="400"></canvas>
      <canvas id="batteryChart" width="400" height="200"></canvas>
    </div>
  );
};

export default Reports;
