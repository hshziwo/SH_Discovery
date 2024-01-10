import { useRef, useState } from 'react';
import AnalyticsContent from '../components/AnalyticsContent';
import Loading from '../components/Loading';
import SearchArea from '../components/SearchArea';
import Shoutcut from '../components/Shortcut';
import SvgArea from '../components/SvgArea';
import Visualazation from '../components/Visualazation';
import WordCloud from '../components/WordCloud';

const WordCloudPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const wordRef = useRef<HTMLInputElement>(null);

    const getData = () => {
        if (!isLoading && wordRef.current) {
            const word = wordRef.current.value;
            if (word) {
                setIsLoading(true);
                fetch(
                    `${process.env.REACT_APP_API_ROOT}/api/analysis/wordcloud?word=${word}`
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
                        <WordCloud data={data} />
                    )}
                </SvgArea>
            </Visualazation>
            <Shoutcut>
                <span>WordCloud</span>
                <SearchArea word={wordRef} getData={getData}></SearchArea>
            </Shoutcut>
        </AnalyticsContent>
    );
};

export default WordCloudPage;
