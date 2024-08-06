/* Music: Solas x Interstellar by Gabriel Albuquerque */

import React, { useEffect, useRef, useState } from 'react';
import { IoVolumeMute, IoVolumeHigh } from "react-icons/io5";
import Interstellar from '../assets/sounds/Interstellar.mp3'

const MusicPlayer = () => {
  const audioRef = useRef(new Audio(Interstellar));
  // audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxVolume = 1;
    //Increasing volume positions
    const startDecreasingVolumeAt = window.innerWidth <= 767 ? 1800 : 1400;
    const startIncreasingVolumeAt = window.innerWidth <= 767 ? 6200 : 3600;

    // Decrease the volume when scrolling down
    if (scrollPosition < startDecreasingVolumeAt) {
      let decreasingVolume = 1 - scrollPosition / startDecreasingVolumeAt;
      audioRef.current.volume = Math.max(0, Math.min(maxVolume, decreasingVolume));
    } else {
      audioRef.current.volume = 0; // Set volume to 0 when scrolling down beyond startDecreasingVolumeAt
    }

    // Increase the volume back when scrolling up
    if (scrollPosition >= startIncreasingVolumeAt) {
      let increasingVolume = (scrollPosition - startIncreasingVolumeAt) / 260; // divisor used for sensitivity
      audioRef.current.volume = Math.max(0, Math.min(maxVolume, increasingVolume));
    }
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove the scroll event listener when the component is unmounted
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  return (
    <button className="music-button" onClick={() => setIsPlayingMusic(!isPlayingMusic)}>
      {isPlayingMusic ? (
        <IoVolumeHigh />
      ) : (
        <IoVolumeMute />
      )}
    </button>
  );
};

export default MusicPlayer;