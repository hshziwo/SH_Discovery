import styled from 'styled-components';
import { useRef, useState } from 'react';
import SearchArea from '../components/SearchArea';
import NetworkGraph from '../components/NetworkGraph';

const Wrapper = styled.div<{ isLoading: boolean }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    ${({ isLoading }) =>
        isLoading &&
        `
        opacity: 0.3;
        pointer-events : none;
        `}
`;

const Visualazation = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    padding: 1rem;
    border: 1px solid rgb(229 231 235);
`;

const Loading = styled.div<{ isLoading: boolean }>`
    display: none;

    ${({ isLoading }) =>
        isLoading &&
        `
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    `}
`;

const SvgArea = styled.div<{ isLoading: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    ${({ isLoading }) =>
        isLoading &&
        `
        display: none;
    `}
`;

const Shoutcut = styled.div`
    width: 30%;
    padding: 1rem;
    border: 1px solid rgb(229 231 235);
    border-left: 0;
`;

const RelatedWordNetwork = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const wordRef = useRef<HTMLInputElement>(null);

    const getData = () => {
        if (!isLoading && wordRef.current) {
            const word = wordRef.current.value;
            if (word) {
                setIsLoading(true);
                fetch(
                    `${process.env.REACT_APP_API_ROOT}/analytics/network?word=${word}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        setIsLoading(false);
                        setData(data.items);
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.log(error);
                    });
            }
        }
    };

    return (
        <Wrapper isLoading={isLoading}>
            <Visualazation>
                <Loading isLoading={isLoading}>Loading...</Loading>
                <SvgArea isLoading={isLoading}>
                    {data.length == 0 ? (
                        'Please enter your search word.'
                    ) : (
                        <NetworkGraph data={data} />
                    )}
                </SvgArea>
            </Visualazation>
            <Shoutcut>
                <SearchArea word={wordRef} getData={getData}></SearchArea>
            </Shoutcut>
        </Wrapper>
    );
};

export default RelatedWordNetwork;
