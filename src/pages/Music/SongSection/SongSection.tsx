import React from 'react';
import {
    PlayList,
    PlayListContainer,
    SongSectionContainer,
    Track,
    TrackDuration,
    TrackImg,
    TrackIndex,
    TrackInfos,
    TrackName,
} from './SongSection.styled';
import { useMusic } from 'src/pages/Music/MusicProvider';

const SongSection = () => {
    const {
        index,
        currentTime,
        musicList,
        pause,
        clickAudio,
    } = useMusic();

    return (
        <SongSectionContainer>
            <PlayListContainer>
                <PlayList>
                    {musicList.map((music, key = 0) =>
                        <Track
                            key={key}
                            onClick={() => clickAudio(key)}
                            isCurrentTrack={index === key}
                            isPlaying={pause}
                        >
                            <TrackIndex>{(key + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}</TrackIndex>

                            <TrackImg src={music.img} alt="img"/>

                            <TrackInfos>
                                <TrackName>{music.name}</TrackName>
                            </TrackInfos>

                            <TrackDuration>
                                {index === key
                                    ? currentTime
                                    : music.duration
                                }
                            </TrackDuration>
                        </Track>
                    )}
                </PlayList>
            </PlayListContainer>
        </SongSectionContainer>
    );
};

export default SongSection;
