import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Global } from '@emotion/react';
import { GlobalStyle } from './index.styled';
import App from './routing/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
    <Router>
        <Global styles={GlobalStyle}/>
        <App/>
    </Router>
);
