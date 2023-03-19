import styled from '@emotion/styled';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { List } from '@mui/material';

export const StyledToolbar = styled(Toolbar)`
    display: flex;
    position: relative;
    flex: 1;
    align-items: center;
    justify-content: center;

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
        display: none;
    }
`;

export const StyledList = styled(List)`
    a {
        text-decoration: none;
        color: black;
    }
`;

export const DrawerButton = styled(Button)`
    position: absolute;
    left: 4px;
    margin-top: 4px;

    > svg {
        height: 28rem;
        width: 28rem;
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;

    font-family: monospace;
    font-size: 16rem;

    > svg {
        margin-right: 8px;
    }
`;
