import * as React from 'react';
import { Link } from 'react-router-dom';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GroupContainer, StyledButton } from './Group.styled';
import { routesType } from 'src/routing/routing';

type Props = {
    routes: routesType;
};

const Group = ({
    routes,
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    return (
        <GroupContainer>
            <StyledButton
                ref={anchorRef}
                onClick={handleToggle}
                open={open}
            >
                {routes.title}
                <ArrowDropDownIcon/>
            </StyledButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}
                                >
                                    {routes.routes?.map(route => (
                                        <Link to={route.link}>
                                            <MenuItem onClick={handleClose}>
                                                {route.title}
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </GroupContainer>
    );
};

export default Group;