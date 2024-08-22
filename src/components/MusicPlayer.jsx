/* Music: Solas x Interstellar by Gabriel Albuquerque */

import React, { useEffect, useRef, useState } from 'react';
import Interstellar from '../assets/sounds/Interstellar.mp3'
import { MdMusicNote, MdMusicOff } from 'react-icons/md';

const MusicPlayer = () => {
  const audioRef = useRef(new Audio(Interstellar));
  // audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  return (
    <button
      className="music-button"
      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
      aria-label={isPlayingMusic ? "Mute music" : "Play music"}
      title={isPlayingMusic ? "Mute music" : "Play music"}
    >
      {isPlayingMusic ? (
        <MdMusicOff />
      ) : (
        <MdMusicNote />
      )}
    </button>
  );
};

export default MusicPlayer;