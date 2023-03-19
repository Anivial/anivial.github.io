import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const SnakePage = styled.div`
    flex-direction: column;
    align-items: center;
    padding: 40px 16px 0 16px;

    div {
        font-size: clamp(20rem, 2vw + 16rem, 32rem);
        margin: 16px;
    }
`;

type SnakeCanvasProps = {
    gameOver?: boolean;
};

export const SnakeCanvas = styled.canvas<SnakeCanvasProps>`
    max-width: 100%;
    max-height: 60vh;
    border: solid 1px black;
    margin-bottom: 16px;
    border-radius: 32px;

    ${props => props.gameOver && css`
        opacity: 0.5;
    `}
`;