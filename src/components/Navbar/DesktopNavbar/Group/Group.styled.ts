import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

export const GroupContainer = styled.div`
    a {
        color: black;
        margin: 0;
        font-weight: normal;
    }
`;

type ButtonProps = {
    open: boolean;
};

export const StyledButton = styled(Button)<ButtonProps>`
    svg {
        margin-top: -4px;

        transform: rotate(0deg);
        transition: transform .2s ease;

        ${props => props.open && css`
            transform: rotate(180deg);
        `}
    }
`;
