import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './chart.css';

export default function Chart({ title, data, dataKey, grid }) {
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [data, grid]);

  const drawChart = () => {
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[dataKey])])
      .nice()
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.name) + x.bandwidth() / 2)
      .y(d => y(d[dataKey]));

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    // Draw the line with animation
    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#5550bd')
      .attr('stroke-width', 2)
      .attr('d', line);

    const totalLength = path.node().getTotalLength();

    path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add data points with animation
    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.name) + x.bandwidth() / 2)
      .attr('cy', d => y(d[dataKey]))
      .attr('r', 0)
      .attr('fill', '#5550bd')
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('r', 5);

    if (grid) {
      svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat(''))
    }
  };

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <svg ref={chartRef}></svg>
    </div>
  );
}
