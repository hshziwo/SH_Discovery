import logo from './image/logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [getMessage, setGetMessage] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ROOT}/flask/test`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log('SUCCESS', data);
                setGetMessage(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>React + Flask Tutorial</p>
                <div>
                    {getMessage.resultStatus === 'SUCCESS' ? (
                        <h3>{getMessage.message}</h3>
                    ) : (
                        <h3>LOADING</h3>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App;
