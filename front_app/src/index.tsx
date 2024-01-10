import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GlobalStyle } from './styles/global';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // 렌더링 두번 호출로 인해 주석처리
    // <React.StrictMode>
    <>
        <GlobalStyle />
        <App />
    </>
    // </React.StrictMode>
);
