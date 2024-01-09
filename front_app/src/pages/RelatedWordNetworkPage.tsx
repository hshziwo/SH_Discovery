import { useRef, useState } from 'react';
import AnalyticsContent from '../components/AnalyticsContent';
import Visualazation from '../components/Visualazation';
import Shoutcut from '../components/Shortcut';
import Loading from '../components/Loading';
import SvgArea from '../components/SvgArea';
import SearchArea from '../components/SearchArea';
import NetworkGraph from '../components/NetworkGraph';

const RelatedWordNetworkPage = () => {
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
        <AnalyticsContent isLoading={isLoading}>
            <Visualazation>
                <Loading isLoading={isLoading}>Loading...</Loading>
                <SvgArea isLoading={isLoading}>
                    {data.length === 0 ? (
                        'Please enter your search word.'
                    ) : (
                        <NetworkGraph data={data} />
                    )}
                </SvgArea>
            </Visualazation>
            <Shoutcut>
                <span>Related Word Network</span>
                <SearchArea word={wordRef} getData={getData}></SearchArea>
            </Shoutcut>
        </AnalyticsContent>
    );
};

export default RelatedWordNetworkPage;
