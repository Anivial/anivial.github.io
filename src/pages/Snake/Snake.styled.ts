import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const SnakePage = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    text-align: center;
    padding: 28px;
`;

type SnakeCanvasProps = {
    gameOver?: boolean;
};

export const SnakeCanvas = styled.canvas<SnakeCanvasProps>`
    max-width: 100%;
    border: solid 1px black;
  
    ${props => props.gameOver && css`
          opacity: 0.5;
    `}
`