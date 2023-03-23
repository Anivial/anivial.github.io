import styled from '@emotion/styled';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Drawer, List, ListItemText } from '@mui/material';

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

export const StyledDrawer = styled(Drawer)`
    .MuiPaper-root {
        background-color: #282c34;
        color: white;
    }
`;

export const StyledListItemText = styled(ListItemText)`
    > * {
        font-size: 14rem !important;
    }
`;

export const StyledList = styled(List)`
    min-width: min(280px, 100vw);
    padding: 8px;

    a {
        text-decoration: none;
        color: white;
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
