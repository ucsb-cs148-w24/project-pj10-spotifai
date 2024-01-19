import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function HelloWorldChart() {
    const ref = useRef();
    useEffect(() => {

        var svg = d3.select(ref.current)
            .append("svg")
            .attr("width")
            .attr("height");

        var path = d3.geoPath();
        var projection = d3.geoMercator()
            .scale(70)
            .center([0,20])
            .translate([width / 2, height / 2]);
        
        var data = d3.map();
        var colorScale = d3.scaleThreshold()
            .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
            .range(d3.schemeBlues[7]);
        
        Promise.all([
            d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
            d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); }),
        ]);
            //  .await(ready); i dunno what this would do
    }, []);

    return (
        <text x="0" y="15" fill="red">Hello World</text>
    );
}