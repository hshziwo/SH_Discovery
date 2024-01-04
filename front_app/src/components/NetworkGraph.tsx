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
        const style = svgRef.current?.parentElement?.getBoundingClientRect();
        let width = style?.width;
        let height = style?.height;
        if (!width) width = 500;
        if (!height) height = 350;
        const svg = d3
            .select(svgRef.current)
            .attr('width', width) // SVG의 너비 설정
            .attr('height', height); // SVG의 높이 설정

        svg.selectAll('*').remove();

        const output = svg.append('g');

        const link = output
            .selectAll('line')
            .data(edges)
            .join('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        const node = output
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

        function setMapPosition(svgElement: any, groupElement: any) {
            // 전체 view, 중앙 정렬
            // graphhalfWidth, graphhalfHeight : svg 안에 그래프가 존재하는 위치의 x, y 좌표만큼 이동된 위치 + 실제 그래프의 크기의 절반
            // graphSize.width, graphSize.height : svg 안의 실제 그래프의 width, height
            const graphSize = groupElement.node().getBBox();
            const graphhalfWidth = graphSize.x + graphSize.width / 2;
            const graphhalfHeight = graphSize.y + graphSize.height / 2;
            const svgWidth = parseInt(svgElement.attr('width'), 10);
            const svgHeight = parseInt(svgElement.attr('height'), 10);
            let initialScale = 1;
            let baseWidth = 0;
            let baseHeight = 0;

            if (graphSize.width > svgWidth) {
                initialScale = 1 / (graphSize.width / svgWidth);
            }
            if (graphSize.height > svgHeight) {
                const scale = 1 / (graphSize.height / svgHeight);
                if (initialScale > scale) {
                    initialScale = scale;
                }
            }

            // 화면 svg 크기의 절반에 graphhalf를 scale만큼 줄인 크기를 뺀 만큼을 좌표 이동 시켜준다.
            // graph 가로, 세로가 svg보다 크면 -로 당겨지고, svg보다 작으면 +로 이동된다.
            // 이때 initialScale에 의해 한쪽(가로 또는 세로)이 고정된 상태이다.
            baseWidth = svgWidth / 2 - graphhalfWidth * initialScale;
            baseHeight = svgHeight / 2 - graphhalfHeight * initialScale;

            // groupElement.exec({
            //     style: {
            //         transform: `translate(${baseWidth}px, ${baseHeight}px) scale(${initialScale})`
            //     }
            // });

            groupElement.attr(
                'transform',
                `translate(${baseWidth}, ${baseHeight})`
            );
            groupElement.style('scale', initialScale * 4);

            // console.log(baseWidth, baseHeight, initialScale);

            // trigger tha initial zoom with an initial transform.
            // d3 줌의 위치를 일치 시킴
            // svgElement.history.call(d3.zoom().transform, d3.zoomIdentity.translate(baseWidth, baseHeight).scale(initialScale));
        }

        setTimeout(() => {
            setMapPosition(svg, output);
        }, 1000);
    }, [nodes, edges]);

    return <svg ref={svgRef} />;
};

export default NetworkGraph;
