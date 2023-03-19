import React from 'react';
import MusicPlayer from './MusicPlayer';
import SongSection from './SongSection';
import { MusicPage } from './Music.styled';
import { MusicProvider } from 'src/pages/Music/MusicProvider';

const Music = () => {
    return (
        <MusicProvider>
            <MusicPage>
                <MusicPlayer/>
                <SongSection/>
            </MusicPage>
        </MusicProvider>
    );
};

export default Music;
