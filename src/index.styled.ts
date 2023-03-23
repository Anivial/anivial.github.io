import { css } from '@emotion/react';

export const GlobalStyle = css`

    // Reset margins and box-sizing
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        &:before, &:after {
            box-sizing: inherit;
        }
    }

    html {
        /* Trick to match 1rem = 1px */
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