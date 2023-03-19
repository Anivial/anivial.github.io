import styled from '@emotion/styled';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;

    color: white;

    // Handle pages here
    > * {
        display: flex;
        flex: 1;
        flex-direction: column;

        &:before {
            content: "";
            background-color: inherit;
            height: 16px;
        }

        &:after {
            content: "";
            background-color: inherit;
            height: 16px;
        }
    }
`;