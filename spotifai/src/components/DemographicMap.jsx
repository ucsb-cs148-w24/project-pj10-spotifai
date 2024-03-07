import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import InfoBox from './InfoBox.jsx';
import convertCountryToCode from "./converter.js"
import Tooltip from "@mui/material/Tooltip";

const fetchPlus = (url, retries) =>
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      if (retries > 0) {
        return fetchPlus(url, retries - 1)
      }
      throw new Error(res.status)
    })
    .catch(error => console.error(error.message))

const WorldMapChart = (props) => {
  const ref = useRef();
  const [boxVis, setBoxVis] = React.useState(false);
  const [boxText, setBoxText] = React.useState("filler");
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const handleMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };

  useEffect(() => {
    // The svg
    var svg = d3.select(ref.current),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    // Map and projection
    var projection = d3.geoMercator()
      .scale(40)
      .center([0,20])
      .translate([width / 2, height / 2]);

    // Data and color scale
    var colorScale = d3.scaleThreshold()
      .domain([10,20,30,40,50,60,70,80,90])
      .range(d3.schemeBlues[7]);

    // Load external data
    Promise.all([
      fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(response => response.json()),
      fetchPlus(`https://smmzhu.pythonanywhere.com/?query=${props.query}`, 3)
      // .then(response => response.json()),
    ]).then(function([topo, populationData]) {
      console.log(populationData);
      let data = new Map(); 
      let parsedCSV = populationData[props.query];
      Object.entries(parsedCSV).forEach(([key, value]) => {
        if (!(convertCountryToCode(key) == "Unknown")) {
          data.set(convertCountryToCode(key), value);
        }
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
        setBoxVis(true);
        setBoxText(d.srcElement.__data__.properties.name + ": " + d.srcElement.__data__.total);
        // alert(d.srcElement.__data__.properties.name + ": " + d.srcElement.__data__.total);
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
        setBoxVis(false);
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
          .on("mouseenter", mouseOver)
          .on("mouseleave", mouseLeave)
          
    });
  }, [props.query]);

  return(
    <>
      <div style = {{height: "100%", width: "100%", backgroundColor: "red", position: "relative"}} onMouseMove={handleMouseMove}>
        <svg
          width = {250}
          height = {200}
          style = {{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
          ref={ref}
        >
        </svg>
        <Tooltip title="This data is pulled from Google Trends data over the past 5 years. Indices are calculated as a ratio of the search for the song divided by total google searches in that country. Then the entire map is normalized to be a value between 0 and 100." placement="top">
          <div style={{ position: "absolute", top: "-150px", left: "0px", transform: "translateX(-50%)", width: "250px",  textAlign: "center"}}>
            <h1 style={{color: "white", fontSize: "24px", transition: "text-shadow 0.3s"}} onMouseEnter={(e) => e.target.style.textShadow = "0 0 10px white"} onMouseLeave={(e) => e.target.style.textShadow = "none"}>POPULARITY INDEX</h1>
          </div>
        </Tooltip>
      </div> 
      <InfoBox isVisible = {boxVis} infoText = {boxText} position = {position}/>
    </>
  );
};

export default WorldMapChart;
