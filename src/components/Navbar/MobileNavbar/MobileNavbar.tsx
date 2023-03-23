import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import routing from 'src/routing/routing';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { ListItemButton } from '@mui/material';
import {
    DrawerButton,
    StyledDrawer,
    StyledList,
    StyledListItemText,
    StyledToolbar,
    Title
} from './MobileNavbar.styled';
import Group from 'src/components/Navbar/MobileNavbar/Group';

const MobileNavbar = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    return (
        <StyledToolbar>
            <DrawerButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuRoundedIcon/>
            </DrawerButton>
            <StyledDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="left"
                ModalProps={{
                    keepMounted: false,
                }}
            >
                <StyledList>
                    <Link
                        onClick={() => setOpenDrawer(false)}
                        to={routing.link}
                    >
                        <ListItemButton>
                            <StyledListItemText primary="HOME"/>
                        </ListItemButton>
                    </Link>
                    {routing.routes?.map(route => {
                        if (!route.routes) {
                            return (
                                <Link
                                    onClick={() => setOpenDrawer(false)}
                                    to={route.link}
                                >
                                    <ListItemButton>
                                        <StyledListItemText primary={route.title}/>
                                    </ListItemButton>
                                </Link>
                            );
                        }

                        return (
                            <Group
                                routes={route}
                                closeDrawer={closeDrawer}
                            />
                        );
                    })}
                </StyledList>
            </StyledDrawer>

            <Link to={routing.link}>
                <Title>
                    <GitHubIcon/>
                    {routing.title}
                </Title>
            </Link>
        </StyledToolbar>
    );
};

export default MobileNavbar;