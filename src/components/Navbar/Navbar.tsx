import * as React from 'react';
import { StyledAppBar } from './Navbar.styled';
import DesktopNavbar from 'src/components/Navbar/DesktopNavbar';
import MobileNavbar from 'src/components/Navbar/MobileNavbar';

const Navbar = () => {
    return (
        <StyledAppBar position="static">
            <MobileNavbar/>
            <DesktopNavbar/>
        </StyledAppBar>
    );
};

export default Navbar;
