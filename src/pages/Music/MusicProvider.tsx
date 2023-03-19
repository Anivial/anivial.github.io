import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import usePrevious from 'src/hooks/usePrevious';

export const MusicContext = React.createContext<any>(null as any);

interface MusicProviderProps {
    children: React.ReactNode;
}

export const MusicProvider: FC<MusicProviderProps> = ({
    children,
}) => {
    const [index, setIndex] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<string>('0:00');
    const [pause, setPause] = useState<boolean>(false);

    const playerRef = useRef<HTMLAudioElement>(null);
    const playheadRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const hoverPlayheadRef = useRef<HTMLDivElement>(null);

    const previousIndex = usePrevious(index);

    const musicList = [
        {
            name: 'Journey\'s End',
            img: require('src/assets/quick.jpg'),
            audio: require('src/assets/musics/Journey\'s End.mp3'),
            duration: '2:10'
        },
        {
            name: 'Damage',
            img: require('src/assets/quick.jpg'),
            audio: require('src/assets/musics/Damage.mp3'),
            duration: '1:27'
        },
        {
            name: 'Crystal Night',
            img: require('src/assets/quick.jpg'),
            audio: require('src/assets/musics/Crystal Night.mp3'),
            duration: '2:49'
        },
        {
            name: 'Farewells',
            img: require('src/assets/quick.jpg'),
            audio: require('src/assets/musics/Farewells.mp3'),
            duration: '3:19'
        },
        {
            name: 'Afterward',
            img: require('src/assets/quick.jpg'),
            audio: require('src/assets/musics/Afterward.mp3'),
            duration: '2:39'
        },
        {
            name: 'Swarm and Retaliation',
            img: require('src/assets/quick.jpg'),
            audio: require('src/assets/musics/Swarm and Retaliation.mp3'),
            duration: '1:57'
        },
    ];

    const formatTime = (currentTime) => {
        const minutes: string = Math.floor(currentTime / 60).toString();
        const seconds: string = Math.floor(currentTime % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });
        return `${minutes}:${seconds}`;
    };

    const timeUpdate = () => {
        if (!playerRef.current || !timelineRef.current || !playheadRef.current) {
            return;
        }

        const duration = playerRef.current.duration;
        const playPercent = 100 * (playerRef.current.currentTime / duration);
        playheadRef.current.style.width = playPercent + '%';
        setCurrentTime(formatTime(playerRef.current.currentTime));
    };

    const resetTimeLine = () => {
        if (!hoverPlayheadRef.current) {
            return;
        }

        hoverPlayheadRef.current.style.width = '0';
    };

    const nextSong = () => {
        setIndex((index + 1) % musicList.length);
    };

    const prevSong = () => {
        setIndex((index + musicList.length - 1) % musicList.length);
    };


    const playOrPause = () => {
        if (!playerRef.current) {
            return;
        }

        if (!pause) {
            playerRef.current.play();
        } else {
            playerRef.current.pause();
        }
        setPause(!pause);
    };

    const clickAudio = (key) => {
        if (key !== index) {
            setIndex(key);
        }
    };


    const changeCurrentTime = (e) => {
        if (!playerRef.current || !timelineRef.current || !playheadRef.current) {
            return;
        }

        const duration = playerRef.current.duration;

        const playheadWidth = timelineRef.current.offsetWidth;
        const offsetWidht = timelineRef.current.offsetLeft;
        const userClickWidht = e.clientX - offsetWidht;

        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

        playheadRef.current.style.width = userClickWidhtInPercent + '%';
        playerRef.current.currentTime = (duration * userClickWidhtInPercent) / 100;
    };

    const hoverTimeLine = (e) => {
        if (!playerRef.current || !timelineRef.current || !hoverPlayheadRef.current) {
            return;
        }

        const duration = playerRef.current.duration;

        const playheadWidth = timelineRef.current.offsetWidth;

        const offsetWidht = timelineRef.current.offsetLeft;
        const userClickWidht = e.clientX - offsetWidht;
        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

        if (userClickWidhtInPercent <= 100) {
            hoverPlayheadRef.current.style.width = userClickWidhtInPercent + '%';
        }

        const time = (duration * userClickWidhtInPercent) / 100;

        if ((time >= 0) && (time <= duration)) {
            hoverPlayheadRef.current.dataset.content = formatTime(time);
        }
    };

    const value = {
        index, setIndex,
        currentTime, setCurrentTime,
        pause, setPause,
        playerRef, playheadRef, timelineRef, hoverPlayheadRef,
        musicList,
        currentSong: musicList[index],
        timeUpdate,
        nextSong,
        changeCurrentTime,
        hoverTimeLine,
        resetTimeLine,
        prevSong,
        playOrPause,
        clickAudio,
    };

    // Handle song changes
    useEffect(() => {
        if (!playerRef.current || !playheadRef.current) {
            return;
        }

        if (previousIndex !== index) {
            setCurrentTime('0:00');
            playheadRef.current.style.width = '0%';
            playerRef.current.currentTime = 0;
            playerRef.current.src = musicList[index].audio;
            playerRef.current.load();

            if (pause) {
                playerRef.current.play();
            }
        }
    }, [index, musicList, playerRef, pause, previousIndex]);

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);
