import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WorldMapChart = () => {
  const ref = useRef();

  useEffect(() => {
    // The svg
    var svg = d3.select(ref.current),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    // Map and projection
    var projection = d3.geoMercator()
      .scale(70)
      .center([0,20])
      .translate([width / 2, height / 2]);

    // Data and color scale
    var colorScale = d3.scaleThreshold()
      .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);

    // Load external data
    Promise.all([
      fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(response => response.json()),
      fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv").then(response => response.text())
    ]).then(function([topo, populationData]) {
      let data = new Map();
      let parsedCSV = d3.csvParse(populationData);
      parsedCSV.forEach(d => {
        data.set(d.code, +d.pop);
      });

      // Mouseover and mouseleave functions
      let mouseOver = function(d) {
        d3.selectAll(".Country")
          .transition()
          .duration(200)
          .style("opacity", .5);
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("stroke", "black");
        alert(d.srcElement.__data__.properties.name + ": " + d.srcElement.__data__.total);
      }

      let mouseLeave = function(d) {
        d3.selectAll(".Country")
          .transition()
          .duration(20)
          .style("opacity", .8);
        d3.select(this)
          .transition()
          .duration(20)
          .style("stroke", "transparent");
      }

      // Draw the map
      svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
          .attr("d", d3.geoPath().projection(projection))
          .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
          })
          .style("stroke", "transparent")
          .attr("class", "Country")
          .style("opacity", .8)
          .on("mouseover", mouseOver)
          .on("mouseleave", mouseLeave)
    });
  }, []);

  return <svg width={800} height={450} ref={ref}></svg>;
};

export default WorldMapChart;