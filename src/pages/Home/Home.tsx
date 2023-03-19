import React from 'react';
import logo from 'src/logo.svg';
import { Header, HomeContainer, Logo } from './Home.styled';

const Home = () => {
    return (
        <HomeContainer>
            <Header>
                <Logo
                    src={logo}
                    alt="logo"
                />
                <div>
                    Hello World :')
                </div>
            </Header>
        </HomeContainer>
    );
};

export default Home;
