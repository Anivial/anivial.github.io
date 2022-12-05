import React from 'react';
import logo from './logo.svg';
import './App.css';


const App = () => {
    console.log(process.env)

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Hello Worlds :')
                </p>
            </header>
        </div>
    );
};

export default App;
