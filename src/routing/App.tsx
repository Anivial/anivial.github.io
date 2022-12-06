import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from 'src/components/Navbar/Navbar';
import Home from 'src/pages/Home';
import Snake from 'src/pages/Snake';
import { AppContainer, Content } from './App.styled';


const App = () => {
    return (
        <AppContainer>
            <Navbar/>
            <Content>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/snake" element={<Snake/>}/>
                </Routes>
            </Content>
        </AppContainer>
    );
};

export default App;
