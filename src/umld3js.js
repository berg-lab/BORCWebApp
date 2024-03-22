import * as d3 from 'd3';

export class D3PieChart {
    constructor(labels, dataPoints, containerId) {
        this.labels = labels;
        this.dataPoints = dataPoints;
        this.containerId = containerId;
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.clearChart();
        this.drawPieChart();
    }

    clearChart() {
        d3.select(`#${this.containerId}`).selectAll("*").remove();
    }

    drawPieChart() {
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(`#${this.containerId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const pie = d3.pie().value(d => d);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const arcs = pie(this.dataPoints);

        svg.selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => this.colors(i))
            .attr("stroke", "#000")
            .style("stroke-width", "2px")
            .transition()
            .duration(1000) // Animation duration in milliseconds
            .attrTween("d", function (d) {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        arcs.forEach((d, i) => {
            const label = this.labels[i];
            svg.append("text")
                .attr("transform", `translate(${arc.centroid(d)})`)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(label);
        });
    }
}

export class D3BarChart {
    constructor(labels, dataPoints, containerId) {
        this.labels = labels;
        this.dataPoints = dataPoints;
        this.containerId = containerId;
        this.clearChart();
        this.drawBarChart();
    }

    clearChart() {
        d3.select(`#${this.containerId}`).selectAll("*").remove();
    }

    drawBarChart() {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = (this.labels.length * 50) + margin.left + margin.right;
        const height = 400;

        const svg = d3.select(`#${this.containerId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width - margin.left - margin.right])
            .padding(0.1)
            .domain(this.labels);

        const y = d3.scaleLinear()
            .range([height - margin.top - margin.bottom, 0])
            .domain([0, d3.max(this.dataPoints)]);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(this.dataPoints)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(this.labels[i]))
            .attr("width", x.bandwidth())
            .attr("y", height - margin.top - margin.bottom)
            .attr("height", 0)
            .attr("fill", "steelblue")
            .transition()
            .duration(1000)
            .attr("y", d => y(d))
            .attr("height", d => height - margin.top - margin.bottom - y(d));

    }
}

export class D3LineChart {
    constructor(labels, dataPoints, containerId) {
        this.labels = labels;
        this.dataPoints = dataPoints;
        this.containerId = containerId;
        this.clearChart();
        this.drawLineChart();
    }

    clearChart() {
        d3.select(`#${this.containerId}`).selectAll("*").remove();
    }

    drawLineChart() {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = (this.labels.length * 50) + margin.left + margin.right;
        const height = 400;

        const svg = d3.select(`#${this.containerId}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width - margin.left - margin.right])
            .padding(0.1)
            .domain(this.labels);

        const y = d3.scaleLinear()
            .range([height - margin.top - margin.bottom, 0])
            .domain([0, d3.max(this.dataPoints)]);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .call(d3.axisLeft(y));

        const line = d3.line()
            .x((d, i) => x(this.labels[i]) + x.bandwidth() / 2)
            .y(d => y(d));

        svg.append("path")
            .datum(this.dataPoints)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line)
            .attr("stroke-dasharray", function() {
                const length = this.getTotalLength();
                return length + " " + length;
            })
            .attr("stroke-dashoffset", function() {
                return this.getTotalLength();
            })
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    }
}

export class D3StackedBarChart {
    constructor(labels, data, containerId) {
        this.labels = labels;
        this.data = data;
        this.containerId = containerId;
        this.drawStackedBarChart();
    }

    drawStackedBarChart() {
		// Restructure the data
		const restructuredData = this.labels.map((label, i) => {
			return {
				label: label,
				male: this.data[0][i], // Assuming the first array corresponds to male
				female: this.data[1][i] // Assuming the second array corresponds to female
			};
		});
	
		const margin = { top: 20, right: 20, bottom: 30, left: 40 };
		const container = document.getElementById(this.containerId);
		const width = container.clientWidth - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;
		const color = d3.scaleOrdinal(d3.schemeCategory10);
	
		const svg = d3.select(`#${this.containerId}`)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);
	
		const x0 = d3.scaleBand()
			.domain(restructuredData.map(d => d.label))
			.rangeRound([0, width])
			.paddingInner(0.1);
	
		const x1 = d3.scaleBand()
			.domain(['male', 'female'])
			.rangeRound([0, x0.bandwidth()])
			.padding(0.05);
	
		const y = d3.scaleLinear()
			.domain([0, d3.max(restructuredData, d => Math.max(d.male, d.female))])
			.nice()
			.rangeRound([height, 0]);
	
		svg.append("g")
			.selectAll("g")
			.data(restructuredData)
			.enter().append("g")
			.attr("transform", d => `translate(${x0(d.label)},0)`)
			.selectAll("rect")
			.data(d => ['male', 'female'].map(key => ({ key, value: d[key] })))
			.enter().append("rect")
			.attr("x", d => x1(d.key))
			.attr("y", height) // Set initial y position to the bottom of the chart for animation
			.attr("width", x1.bandwidth())
			.attr("height", 0) // Set initial height to 0 for animation
			.attr("fill", d => color(d.key))
			.transition() // Apply transition for animations
			.duration(1000) // Set animation duration to 1000 milliseconds
			.delay((d, i) => i * 100) // Delay each bar animation
			.attr("y", d => y(d.value))
			.attr("height", d => height - y(d.value));
	
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x0));
	
		svg.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(y).ticks(null, "s"));
	}
	
}
