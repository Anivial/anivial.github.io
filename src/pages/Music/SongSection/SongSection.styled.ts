import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

const shadowColor = '#0a2a62';

export const SongSectionContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 16px;

    @media (min-width: 992px) {
        margin-top: 0;
    }
`;

export const PlayListContainer = styled.div`
    display: flex;
    min-width: 330px;
    background-color: white;
    border-radius: 16px;
    padding: 16px 0;
    margin: 8px;

    @media (min-width: 992px) {
        min-width: 500px;
        border-radius: 40px;
        padding: 16px;
    }
`;

export const PlayList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
`;

// Img preview
export const TrackImg = styled.img`
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 16px;
    margin: 2px 16px 2px 2px;
`;

// Single track
type TrackProps = {
    isCurrentTrack: boolean;
    isPlaying: boolean;
};

export const Track = styled.div<TrackProps>`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 20px;
    transition: 0.3s;
    cursor: pointer;
    min-height: 64px;
    width: 100%;
    color: black;

    &:hover {
        background: ${shadowColor};
        border-color: ${shadowColor};
        color: white !important;
    }

    ${props => props.isCurrentTrack && css`
        background: ${shadowColor};
        color: white !important;
    `};
`;

export const TrackIndex = styled.div`
    font-size: 16rem;
    font-weight: bold;
    margin: 0 12px 0 20px;
    color: grey;
`;

// Infos
export const TrackInfos = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`;

export const TrackName = styled.div`
    font-size: 16rem;
    font-weight: bold;
`;

export const TrackDuration = styled.div`
    margin-right: 14px;
    font-size: 14rem;
    font-weight: bold;
`;