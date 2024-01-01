import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Description from './pages/Description';
import Analytics from './pages/Analytics';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/description" element={<Description />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
