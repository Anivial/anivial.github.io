import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    FRACTAL_PATH,
    HOME_PATH,
    MUSIC_PATH,
    SNAKE_PATH,
    VERLET_QUICK_PATH,
    VERLET_RANDOM_PATH
} from 'src/routing/routePaths';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from 'src/components/Navbar/Navbar';
import Home from 'src/pages/Home';
import Snake from 'src/pages/Snake';
import Fractal from 'src/pages/Fractal';
import Verlet from 'src/pages/Verlet';
import VerletQuick from 'src/pages/Verlet/VerletQuick';
import Music from 'src/pages/Music';
import { AppContainer, Content } from './App.styled';

const darkTheme = createTheme({
    typography: {
        htmlFontSize: 1,
    },
    palette: {},
});

const App = () => {
    return (
        <AppContainer>
            <ThemeProvider theme={darkTheme}>
                <Navbar/>
                <Content id="content">
                    <Routes>
                        <Route path={HOME_PATH} element={<Home/>}/>
                        <Route path={SNAKE_PATH} element={<Snake/>}/>
                        <Route path={FRACTAL_PATH} element={<Fractal/>}/>
                        <Route path={VERLET_RANDOM_PATH} element={<Verlet/>}/>
                        <Route path={VERLET_QUICK_PATH} element={<VerletQuick/>}/>
                        <Route path={MUSIC_PATH} element={<Music/>}/>
                    </Routes>
                </Content>
            </ThemeProvider>
        </AppContainer>
    );
};

export default App;
