import React from 'react';
import logo from './logo.svg';
import { AppContainer, Header, Logo } from './App.styled';
import { Routes, Route, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about/test">About</Link>
            <Link to="/careers">Careers</Link>
        </div>
    );
};


const App = () => {
    return (
        <AppContainer>
            <Navbar/>
            <Header>
                <Logo
                    src={logo}
                    alt="logo"
                />
                <p>
                    Hello World :')
                </p>
                <Routes>
                    <Route path="/" element={<div> / </div>}/>
                    <Route path="/about/*" element={(
                        <>
                            /about
                            <Routes>
                                <Route path="/test" element={<div> /test </div>}/>
                            </Routes>
                        </>
                    )}/>
                    <Route path="/careers" element={<div> /careers </div>}/>
                </Routes>
            </Header>
        </AppContainer>
    );
};

export default App;
