import * as React from 'react';
import { Link } from 'react-router-dom';
import routing from 'src/routing/routing';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { StyledToolbar, Title } from './DesktopNavbar.styled';
import Group from './Group';

const DesktopNavbar = () => {
    return (
        <StyledToolbar>
            <Link to={routing.link}>
                <Title>
                    <GitHubIcon/>
                    anivial.github.io
                </Title>
            </Link>

            {routing.routes?.map(route => {
                if (!route.routes) {
                    return (
                        <Link to={route.link}>
                            <Button>
                                {route.title}
                            </Button>
                        </Link>
                    );
                }

                return <Group routes={route}/>;
            })}
        </StyledToolbar>
    );
};

export default DesktopNavbar;