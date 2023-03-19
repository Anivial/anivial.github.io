import { css } from '@emotion/react';

export const GlobalStyle = css`
    * {
        margin: 0;
        padding: 0;
    }

    html {
        /* 10px */
        font-size: 6.25%;
        height: 100%;
    }

    #root {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 16rem;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body, #root {
        background-color: #282c34;
        margin: 0;
        height: 100%;
    }
`;