import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from 'src/components/Navbar/Navbar';
import Home from 'src/pages/Home';
import Test from 'src/pages/Test';
import { AppContainer, Content } from './App.styled';


const App = () => {
    return (
        <AppContainer>
            <Navbar/>
            <Content>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/test" element={<Test/>}/>
                </Routes>
            </Content>
        </AppContainer>
    );
};

export default App;
