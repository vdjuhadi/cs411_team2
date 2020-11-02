import React, { Component} from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection';


class Graph extends Component {
    constructor(props) {
        super(props)
        this.createGraph = this.createGraph.bind(this)
    }
    componentDidMount() {
        this.createGraph()
    }
    componentDidUpdate() {
        this.createGraph()
    }
    createGraph() {
        const NODE = this.node;

        const link_colors = {
            metal: "#6494AA",
            latin: "#A63D40",
            jazz: "#E9B872",
            electronic: "#90A959",
            funk: "#6494AA",
            soul: "#90A959"
        };

        const node_colors = {
             elisson: "#151515",
             rafael: "#A63D40",
             both: "#E9B872",
        };

        select(NODE)
            .attr(
                "viewBox", 
                [-this.props.width / 2, -this.props.height / 2, this.props.width, this.props.height]
            );

        function drag(simulation) {

            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(1).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        function node_color(d) {
            // const scale = d3.scaleOrdinal(d3.schemeCategory10);
            // return d => scale(d.group);
            // return node_colors[d.__proto__.source];
            return link_colors[d.__proto__.genres[0]];
        }

        function link_color(d) {
            return "#171717";
        }

        const graph = this.props.graph

        const links = graph.links.map(d => Object.create(d));
        const nodes = graph.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
            // .force("link", d3.forceLink(links).id(d => d.id).distance(200).strength(0.1))
            .force("charge", d3.forceManyBody(links).strength(-200))
            .force("link", d3.forceLink(links).id(d => d.id).strength(0.0001))
            .force("x", d3.forceX().x(d => {
                const xCenter = {
                    both: 0,
                    elisson: 500,
                    rafael: -500
                }
                return xCenter[d.__proto__.source]
            }))
            .force("y", d3.forceY());
        
        const link = select(NODE)
            .attr("stroke-opacity", 0)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", d => link_color(d))
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.07);
        
        const node = select(NODE)
            .attr("stroke", "#171717")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 0.7)
            .selectAll("circle")
            .data(nodes)
            .join("g")
            .attr("class", "node")
            .append("circle")
            .attr("r", 10)
            .attr("fill", d => node_color(d))
            .call(drag(simulation))
            
        node.append("svg:label")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) { return d.id });

        var labels = select(NODE)
            .selectAll("g")
            .append("text")
            .attr("class", "label")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) { return d.id });

        
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
            
            labels
                .attr("x", function (d) { return d.x + 8; })
                .attr("y", function (d) { return d.y; });
        });
    }

    render() {
        return <svg className=".svg-container" ref={node => this.node = node}
            width={this.props.width} height={this.props.height}>
        </svg>
    }
}
export default Graph
