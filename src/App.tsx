import React from 'react';
import logo from './logo.svg';
import { AppContainer, Header, Logo } from './App.styled';


const App = () => {
    return (
        <AppContainer>
            <Header>
                <Logo
                    src={logo}
                    alt="logo"
                />
                <p>
                    Hello World :')
                </p>
            </Header>
        </AppContainer>
    );
};

export default App;
