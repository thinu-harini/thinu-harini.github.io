/* Music: Solas x Interstellar by Gabriel Albuquerque */

import React, { useEffect, useRef, useState } from 'react';
import { IoVolumeMute, IoVolumeHigh } from "react-icons/io5";
import Interstellar from '../assets/sounds/Interstellar.mp3'

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
        <IoVolumeHigh />
      ) : (
        <IoVolumeMute />
      )}
    </button>
  );
};

export default MusicPlayer;