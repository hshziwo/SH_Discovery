import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import media from './styles/media';

import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Description from './pages/Description';
import Analytics from './pages/Analytics';

const Main = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    ${media.phone`
        display: none;
    `}
`;

const Error = styled.div`
    display: none;

    ${media.phone`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2rem;
        padding: 1rem;
        font-size: 1.5rem;
        border: 1px solid;
    `}
`;

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Main>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/description" element={<Description />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                </Main>
            </BrowserRouter>
            <Error>
                모바일보기는 현재 지원하지 않습니다.
                <br />
                DeskTop 보기 또는 사이즈를 늘려주세요.
            </Error>
        </>
    );
};

export default App;
