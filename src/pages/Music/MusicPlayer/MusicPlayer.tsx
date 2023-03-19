import React, { useEffect } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import {
    Controls,
    CurrentSong,
    HoverPlayhead,
    ImgWrap,
    MusicPlayerContainer,
    MusicPlayerContent,
    PlayButton,
    PlayHead,
    PrevNextButton,
    SongName,
    Time,
    TimeLine,
} from './MusicPlayer.styled';
import { useMusic } from 'src/pages/Music/MusicProvider';

const MusicPlayer = () => {
    const {
        playerRef,
        playheadRef,
        hoverPlayheadRef,
        timelineRef,
        currentSong,
        currentTime,
        timeUpdate,
        nextSong,
        changeCurrentTime,
        hoverTimeLine,
        resetTimeLine,
        pause,
        prevSong,
        playOrPause,
    } = useMusic();

    useEffect(() => {
        playerRef.current?.addEventListener('timeupdate', timeUpdate, false);
        playerRef.current?.addEventListener('ended', nextSong, false);
        timelineRef.current?.addEventListener('click', changeCurrentTime, false);
        timelineRef.current?.addEventListener('mousemove', hoverTimeLine, false);
        timelineRef.current?.addEventListener('mouseout', resetTimeLine, false);

        return () => {
            playerRef.current?.removeEventListener('timeupdate', timeUpdate);
            playerRef.current?.removeEventListener('ended', nextSong);
            timelineRef.current?.removeEventListener('click', changeCurrentTime);
            timelineRef.current?.removeEventListener('mousemove', hoverTimeLine);
            timelineRef.current?.removeEventListener('mouseout', resetTimeLine);
        };
    }, [currentSong, playerRef, timelineRef, timeUpdate, nextSong, changeCurrentTime, hoverTimeLine, resetTimeLine]);

    return (
        <MusicPlayerContainer>
            <MusicPlayerContent>
                <CurrentSong>
                    <audio ref={playerRef}>
                        <source src="" type="audio/ogg"/>
                        Your browser does not support the audio element.
                    </audio>

                    <ImgWrap>
                        <img src={currentSong.img} alt="img"/>
                    </ImgWrap>

                    <SongName>{currentSong.name}</SongName>

                    <Time>
                        <div>{currentTime}</div>
                        <div>{currentSong.duration}</div>
                    </Time>

                    <TimeLine ref={timelineRef}>
                        <PlayHead ref={playheadRef}/>
                        <HoverPlayhead ref={hoverPlayheadRef} data-content="0:00"/>
                    </TimeLine>

                    <Controls>
                        <PrevNextButton onClick={prevSong}>
                            <SkipPreviousRoundedIcon/>
                        </PrevNextButton>

                        <PlayButton onClick={playOrPause}>
                            {pause
                                ? <PauseIcon/>
                                : <PlayArrowRoundedIcon/>
                            }
                        </PlayButton>

                        <PrevNextButton onClick={nextSong}>
                            <SkipNextRoundedIcon/>
                        </PrevNextButton>
                    </Controls>
                </CurrentSong>
            </MusicPlayerContent>
        </MusicPlayerContainer>
    );
};

export default MusicPlayer;
