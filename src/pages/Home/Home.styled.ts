import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const HomeContainer = styled.div`
    align-items: center;
    justify-content: center;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: clamp(20rem, 2vw + 16rem, 32rem);
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Logo = styled.img`
    height: clamp(240rem, 50vmin, 480rem);
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${spin} infinite 20s linear;
    }
`;
