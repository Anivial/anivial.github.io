import styled from '@emotion/styled';

export const FractalContainer = styled.div`
    align-items: center;
    background: black;
    padding-top: 8px;
`;

export const CanvasContainer = styled.div`
    width: 100%;

    canvas {
        width: 100%;
        height: 100%;
    }
`;

export const Settings = styled.div`
    display: flex;
    flex-direction: column;
    background: whitesmoke;
    width: max(200px, 40%);
    font-size: 14rem;
    font-weight: bold;
    padding: 16px;
    color: black;
    margin: 12px;
    border-radius: 12px;

    > *:not(:last-child) {
        margin-bottom: 8px !important;
    }

    @media (min-width: 992px) {
        position: absolute;
        top: 8px;
        right: 0;
        width: 200px;
    }
`;