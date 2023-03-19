import styled from '@emotion/styled';
import Toolbar from '@mui/material/Toolbar';

export const StyledToolbar = styled(Toolbar)`
    display: none;

    button {
        color: white;
    }

    a {
        margin: 0 8px;
        border: none;
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

    @media (min-width: 992px) {
        display: inherit;
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;

    font-family: monospace;
    font-size: 18rem;

    > svg {
        margin-right: 8px;
    }
`;
