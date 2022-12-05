import React from 'react';
import logo from 'src/logo.svg';
import { TestContainer, Header, Logo } from './Test.styled';

const Test = () => {
    return (
        <TestContainer>
            <Header>
                <Logo
                    src={logo}
                    alt="logo"
                />
                <p>
                    Test
                </p>
            </Header>
        </TestContainer>
    );
};

export default Test;
