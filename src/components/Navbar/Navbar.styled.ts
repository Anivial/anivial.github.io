import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';

export const NAVBAR_HEIGHT = 54;

export const StyledAppBar = styled(AppBar)`
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    width: 100%;
    background-color: black;
    box-shadow: 0 0 16px 16px black;

    z-index: 1000;
    height: ${NAVBAR_HEIGHT}px;

    padding-top: 12px;
`;
