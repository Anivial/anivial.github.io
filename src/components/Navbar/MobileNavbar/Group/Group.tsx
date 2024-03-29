import * as React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, List, ListItemButton, } from '@mui/material';
import { routesType } from 'src/routing/routing';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { StyledListItemText } from '../MobileNavbar.styled';

type Props = {
    routes: routesType;
    closeDrawer: () => void;
};

const Group = ({
    routes,
    closeDrawer,
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <StyledListItemText primary={routes.title}/>
                {open
                    ? <ExpandLess/>
                    : <ExpandMore/>
                }
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {routes.routes?.map(route => (
                        <Link
                            onClick={closeDrawer}
                            to={route.link}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <StyledListItemText primary={route.title}/>
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default Group;