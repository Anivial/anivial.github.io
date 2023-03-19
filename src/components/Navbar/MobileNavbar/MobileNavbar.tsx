import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import routing from 'src/routing/routing';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Drawer, ListItemButton, ListItemText } from '@mui/material';
import { DrawerButton, StyledList, StyledToolbar, Title } from './MobileNavbar.styled';
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
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="left"
                ModalProps={{
                    keepMounted: false,
                }}
            >
                <StyledList
                    sx={{ minWidth: 280 }}
                >
                    {routing.routes?.map(route => {
                        if (!route.routes) {
                            return (
                                <Link
                                    onClick={() => setOpenDrawer(false)}
                                    to={route.link}
                                >
                                    <ListItemButton>
                                        <ListItemText primary={route.title}/>
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
            </Drawer>

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