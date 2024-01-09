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

type Graph = {
    nodes: Node[];
    edges: Edge[];
};

type IProps = {
    data: Graph;
};

const setZoom = (svgElement: any, groupElement: any) => {
    const zoom = d3
        .zoom()
        // .on("start", ({ sourceEvent }) => {
        //     if (sourceEvent) {
        //         if (sourceEvent.type == PDConst.actionType.MOUSE_DOWN) {
        //             // 현재는 mousedown에 sourceEvent가 필요없이 mousedown 시점이다라고 fireevent만 하는데
        //             // 필요하면 e.detail에 soruceEvent를 전달할 것
        //             EventUtil.dispatchEvent({
        //                 element: svgElement.node(),
        //                 event: PDConst.eventType.SVG_MOUSE_DOWN
        //             });
        //         }
        //     }
        // })
        .on('zoom', ({ transform }) => {
            groupElement.attr(
                'transform',
                `translate(${transform.x}, ${transform.y})`
            );
            groupElement.style('scale', transform.k);
        });
    svgElement.call(zoom);

    return zoom;

    // d3 drag 시 sourceEvent 캐치 방법(=zoom과 동일함)
    // 최신 D3 문법에는 첫번째 파라미터 객체에 sourceEvent, target, transform, type(=d3 event type) 등이 담김
    // const fun = d3.drag()
    //   .on("start", ({ sourceEvent, target, transform, type }) => {
    //     console.log('start', sourceEvent, target, transform, type);
    // }
    // const rect = d3.select('svg g').selectAll('rect');
    // rect.call(fun);
};

const setMapPosition = (svgElement: any, groupElement: any) => {
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
    // baseWidth = svgWidth / 2 - graphhalfWidth * initialScale;
    // baseHeight = svgHeight / 2 - graphhalfHeight * initialScale;
    baseWidth = svgWidth / 2 / initialScale - graphhalfWidth;
    baseHeight = svgHeight / 2 / initialScale - graphhalfHeight;

    groupElement.attr('transform', `translate(${baseWidth}, ${baseHeight})`);
    groupElement.style('scale', initialScale);

    // trigger tha initial zoom with an initial transform.
    // d3 줌의 위치를 일치 시킴
    // svgElement.call(
    //     d3.zoom().transform,
    //     d3.zoomIdentity.translate(baseWidth, baseHeight).scale(initialScale)
    // );
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

        // let output: any;
        // if (svg.select('g').empty()) {
        //     output = svg.append('g');
        // } else {
        //     output = svg.select('g');
        // }

        const link = output
            .selectAll('line')
            .data(edges)
            .join('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        // schemeCategory10 | schemeAccent | schemeDark2 | schemePaired | schemePastel1 | schemePastel2 | schemeSet1 | schemeSet2 | schemeSet3 | schemeTableau10
        const color: any = d3.scaleOrdinal(d3.schemePastel1);

        const node = output
            .selectAll('g')
            .data(nodes)
            .join('g')
            .each(function (this: any) {
                const text = d3
                    .select(this)
                    .append('text')
                    .text((d: any) => d.id);
                // .attr('x', -5)
                // .attr('y', 5);

                const bbox = text.node()?.getBBox();
                // const fontSize = parseInt(text.style("font-size"));

                if (bbox) {
                    d3.select(this)
                        .insert('rect', ':first-child')
                        // .attr('fill', 'skyblue')
                        // .attr('fill', 'deepskyblue')
                        // .attr('fill', 'lightskyblue')
                        .attr('fill', color)
                        .attr('rx', 8)
                        .attr('ry', 8)
                        // .attr('x', -bbox.width / 2)
                        // .attr('y', -bbox.height / 2)
                        .attr('x', -bbox.width / 2)
                        .attr('y', -bbox.height)
                        .attr('width', bbox.width * 2)
                        .attr('height', bbox.height * 1.5);
                }
            });

        d3.forceSimulation(nodes)
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
            })
            .on('end', () => {
                setZoom(svg, output);
                setMapPosition(svg, output);
            });
    }, [nodes, edges]);

    return <svg ref={svgRef} />;
};

export default NetworkGraph;
