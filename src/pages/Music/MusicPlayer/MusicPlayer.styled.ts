import styled from '@emotion/styled/macro';

const borderRadius = '20px';
const primary = '#709fdc';
const base = '#071739';
const shadowColor = '#274684';
const lighterShadow = '#274684B3';

export const MusicPlayerContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const MusicPlayerContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 360px;
    padding: 8px;
    border-radius: ${borderRadius};
    color: white;
    font-weight: 100;
    box-shadow: 0 0 70px 0 ${shadowColor};
    background: ${base};
    overflow: hidden;
    font-size: 16rem;

    @keyframes play {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const CurrentSong = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 55px 0 30px 0;
    border-radius: 20rem;
    color: ${base};
    background: white;

    audio {
        display: none;
    }
`;

// Image preview
export const ImgWrap = styled.div`
    width: min(270px, 80vw);
    height: min(270px, 80vw);
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 10px 40px 0 ${lighterShadow};

    img {
        object-fit: cover;
        width: 100%;
        min-height: 100%;
    }
`;

// Song info
export const SongName = styled.div`
    margin-top: 30px;
    font-size: 22rem;
`;

// Time progression
export const Time = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: min(240px, 70vw);
`;

// TimeLine bar
export const HoverPlayhead = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    width: 0;
    height: 5px;
    opacity: 0;
    border-radius: 5px;
    background: ${shadowColor};
    transition: opacity .3s;

    &::before {
        opacity: 0;
        content: attr(data-content);
        display: block;
        position: absolute;
        top: -30px;
        right: -23px;
        width: 40px;
        padding: 3px;
        text-align: center;
        color: white;
        background: ${shadowColor};
        border-radius: calc(#{${borderRadius}} - 12px);
    }

    &::after {
        opacity: 0;
        content: '';
        display: block;
        position: absolute;
        top: -8px;
        right: -8px;
        border-top: 8px solid ${shadowColor};
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }
`;

export const TimeLine = styled.div`
    position: relative;
    margin: 0 auto;
    width: min(240px, 70vw);
    height: 5px;
    background: ${primary};
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        ${HoverPlayhead} {
            opacity: 1;

            &::before {
                opacity: 1;
            }

            &::after {
                opacity: 1;
            }
        }
    }
`;

export const PlayHead = styled.div`
    position: relative;
    z-index: 2;
    width: 0;
    height: 5px;
    border-radius: 5px;
    background: ${base};
`;

// Controls
export const Controls = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
`;

export const PrevNextButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${base};
    border-radius: 50%;
    margin: 15px;
    font-size: 18rem;
    transition: all .1s ease;
    cursor: pointer;
    border: none;
    background: 0;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: scale(1.2);
    }
`;

export const PlayButton = styled(PrevNextButton)`
    width: 50px;
    height: 50px;
    border: 1px solid #e2e2e2;

    &:hover {
        left: 0;
        box-shadow: 0 0 8px 0 ${lighterShadow};
    }
`;

// Playlist
export const MusicPlayListContainer = styled.div`
    display: flex;
    height: 200px;
    overflow-y: scroll;

    @media (min-width: 992px) {
        display: none;
    }
`;
