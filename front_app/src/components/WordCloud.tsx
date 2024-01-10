import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = (props: any) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const nodes = props.data.nodes;

    useEffect(() => {
        const style = svgRef.current?.parentElement?.getBoundingClientRect();
        let width = style?.width;
        let height = style?.height;
        if (!width) width = 500;
        if (!height) height = 500;

        const draw = (words: any) => {
            const svg = d3
                .select(svgRef.current)
                .attr('width', layout.size()[0]) // SVG의 너비 설정
                .attr('height', layout.size()[1]); // SVG의 높이 설정

            // join 사용 불가의 경우 지우기 위한 코드
            // svg.selectAll('*').remove();
            // const output = svg.append('g');

            let output: any;
            if (svg.select('g').empty()) {
                output = svg.append('g');
            } else {
                output = svg.select('g');
            }

            // schemeCategory10 | schemeAccent | schemeDark2 | schemePaired | schemePastel1 | schemePastel2 | schemeSet1 | schemeSet2 | schemeSet3 | schemeTableau10
            const color: any = d3.scaleOrdinal(d3.schemeDark2);

            output
                .attr(
                    'transform',
                    'translate(' +
                        layout.size()[0] / 2 +
                        ',' +
                        layout.size()[1] / 2 +
                        ')'
                )
                .selectAll('text')
                .data(words)
                .join('text')
                .style('font-size', (d: any) => {
                    return d.size + 'px';
                })
                .style('font-family', 'Impact')
                .attr('text-anchor', 'middle')
                .attr('transform', (d: any) => {
                    return (
                        'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
                    );
                })
                .attr('fill', color)
                .text((d: any) => {
                    return d.text;
                });
        };

        const layout = cloud()
            .size([width, height])
            // .words(nodes.map((d:any) => {
            //   return {text: d, size: 10 + Math.random() * 90, test: "haha"};
            // }))
            .words(
                nodes.map((d: any) => {
                    return { text: d.id, size: d.count * 10 };
                })
            )
            .padding(5)
            // .rotate(() => {
            //     return ~~(Math.random() * 2) * 90;
            // })
            .rotate(() => {
                return ~~(Math.random() * 2) * 45;
            })
            .font('Impact')
            .fontSize((d: any) => {
                return d.size;
            })
            .on('end', draw);

        layout.start();
    }, [nodes]);

    return <svg ref={svgRef} />;
};

export default WordCloud;
