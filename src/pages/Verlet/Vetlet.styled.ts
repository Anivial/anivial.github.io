import styled from '@emotion/styled';

export const VerletPage = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    text-align: center;
    padding: 40px 16px 0 16px;

    div {
        font-size: clamp(20rem, 2vw + 16rem, 32rem);
        margin: 16px 0;
    }
`;

export const VerletCanvas = styled.canvas`
    max-width: 100%;
    max-height: 75vh;
`;

export const QuickPreview = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50px;

    @media (min-width: 992px) {
        position: absolute;
        top: 50px;
        right: 70px;
    }
`;

export const StyledTooltip = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 12rem;
`;
