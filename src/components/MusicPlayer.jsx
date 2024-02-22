import React, { useEffect, useRef, useState } from 'react';
import { IoVolumeMute, IoVolumeHigh } from "react-icons/io5";
import Interstellar from '../assets/sounds/interstellar.mp3'

const MusicPlayer = () => {
  const audioRef = useRef(new Audio(Interstellar));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxVolume = 1; // Maximum volume
    //Adjust value based on when you want to start increasing volume
    const startDecreasingVolumeAt = window.innerWidth <= 599 ? 1000 : 800;
    const startIncreasingVolumeAt = window.innerWidth <= 599 ? 6600 : 3800;

    // Decrease the volume when scrolling down
    if (scrollPosition < startDecreasingVolumeAt) {
      let decreasingVolume = 1 - scrollPosition / startDecreasingVolumeAt;
      audioRef.current.volume = Math.max(0, Math.min(maxVolume, decreasingVolume));
    } else {
      audioRef.current.volume = 0; // Set volume to 0 when scrolling down beyond startDecreasingVolumeAt
    }

    // Increase the volume when scrolling up after reaching the end of the site
    if (scrollPosition >= startIncreasingVolumeAt) {
      let increasingVolume = (scrollPosition - startIncreasingVolumeAt) / 200; // Adjust divisor for sensitivity
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