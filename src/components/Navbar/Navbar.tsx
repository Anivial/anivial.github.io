import { Link } from 'react-router-dom';
import React from 'react';
import { NavbarContainer } from './Navbar.styled';

const Navbar = () => {
    return (
        <NavbarContainer>
            <Link to="/">Home</Link>
            <Link to="/snake">Snake</Link>
        </NavbarContainer>
    );
};

export default Navbar;