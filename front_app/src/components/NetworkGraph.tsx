import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Node = {
    id: string;
    count: number;
};

type Edge = {
    source: string;
    target: string;
    count: number;
};

// type Graph = {
//     nodes : Node[],
//     edges : Edge[]
// }

type Graph = {
    nodes: any;
    edges: any;
};

type IProps = {
    data: Graph;
};

const NetworkGraph = (props: any) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const data = props.data;
    const nodes = data.nodes;
    const edges = data.edges;

    useEffect(() => {
        const width = 1000;
        const height = 600;
        const svg = d3
            .select(svgRef.current)
            .attr('width', width) // SVG의 너비 설정
            .attr('height', height); // SVG의 높이 설정

        const link = svg
            .selectAll('line')
            .data(edges)
            .join('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        const node = svg
            .selectAll('g')
            .data(nodes)
            .join('g')
            .each(function (d) {
                d3.select(this)
                    .append('circle')
                    .attr('r', 6)
                    .attr('fill', 'skyblue');
                d3.select(this)
                    .append('text')
                    .text((d: any) => d.id)
                    .attr('x', -5)
                    .attr('y', 5);
            });

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                'link',
                d3.forceLink(edges).id((d: any) => d.id)
            )
            .force('change', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .on('tick', () => {
                link.attr('x1', (d: any) => d.source.x)
                    .attr('y1', (d: any) => d.source.y)
                    .attr('x2', (d: any) => d.target.x)
                    .attr('y2', (d: any) => d.target.y);

                node.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
            });
    }, [data]);

    return <svg ref={svgRef} />;
};

export default NetworkGraph;
